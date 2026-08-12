type AppendResult = { ok: true } | { ok: false; error: string };

function extractSpreadsheetId(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match?.[1]) return match[1];
  return trimmed;
}

async function getAccessToken(): Promise<
  { ok: true; accessToken: string } | { ok: false; error: string }
> {
  const clientId =
    process.env.GOOGLE_OAUTH_CLIENT_ID || process.env.GOOGLE_CLIENT_ID;
  const clientSecret =
    process.env.GOOGLE_OAUTH_CLIENT_SECRET || process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken =
    process.env.GOOGLE_OAUTH_REFRESH_TOKEN || process.env.GOOGLE_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return {
      ok: false,
      error:
        "Missing GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET / GOOGLE_OAUTH_REFRESH_TOKEN",
    };
  }

  const body = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    refresh_token: refreshToken,
    grant_type: "refresh_token",
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  const json = (await res.json().catch(() => null)) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  } | null;

  if (!res.ok) {
    return {
      ok: false,
      error:
        json?.error_description ||
        json?.error ||
        `Failed to fetch access token (${res.status})`,
    };
  }

  if (!json?.access_token) {
    return { ok: false, error: "Google token response missing access_token" };
  }

  return { ok: true, accessToken: json.access_token };
}

async function callSheetsApi(
  endpoint: string,
  method = "GET",
  body: unknown = null,
): Promise<unknown> {
  const tokenResult = await getAccessToken();
  if (!tokenResult.ok) {
    throw new Error(tokenResult.error);
  }

  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${endpoint}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${tokenResult.accessToken}`,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    },
  );

  const json = (await res.json().catch(() => null)) as {
    error?: { message?: string };
  } | null;

  if (!res.ok) {
    throw new Error(json?.error?.message || `Sheets API Error: ${res.status}`);
  }

  return json;
}

async function ensureSheetExists(
  spreadsheetId: string,
  title: string,
): Promise<void> {
  try {
    const metadata = (await callSheetsApi(spreadsheetId)) as {
      sheets?: Array<{ properties: { title: string } }>;
    };
    const sheetExists = metadata.sheets?.some(
      (sheet) => sheet.properties.title === title,
    );

    if (!sheetExists) {
      await callSheetsApi(`${spreadsheetId}:batchUpdate`, "POST", {
        requests: [
          {
            addSheet: {
              properties: { title },
            },
          },
        ],
      });
    }
  } catch (error) {
    console.warn(`Check/Create sheet failed: ${error}`);
  }
}

async function ensureHeaders(
  spreadsheetId: string,
  sheetName: string,
  headers: string[],
): Promise<void> {
  try {
    const range = `${sheetName}!A1:Z1`;
    const result = (await callSheetsApi(
      `${spreadsheetId}/values/${encodeURIComponent(range)}`,
    )) as { values?: string[][] };

    if (!result.values || result.values.length === 0) {
      await callSheetsApi(
        `${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED`,
        "POST",
        { values: [headers] },
      );
    }
  } catch (error) {
    console.warn(`Check/Write headers failed: ${error}`);
  }
}

export async function appendRowToSheet(
  sheetName: string,
  rowValues: unknown[],
  headers: string[],
): Promise<AppendResult> {
  const spreadsheetEnv = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!spreadsheetEnv) {
    return { ok: false, error: "Missing GOOGLE_SHEETS_SPREADSHEET_ID env var" };
  }

  const spreadsheetId = extractSpreadsheetId(spreadsheetEnv);

  try {
    await ensureSheetExists(spreadsheetId, sheetName);
    await ensureHeaders(spreadsheetId, sheetName, headers);

    const range = `${sheetName}!A1`;
    await callSheetsApi(
      `${spreadsheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
      "POST",
      { values: [rowValues] },
    );

    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error(`Google Sheets append failed: ${message}`);
    return { ok: false, error: message };
  }
}

export type RosemontGroveLead = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isRealtor: string;
  buyingTimeframe: string;
  preferredHomeType: string;
  message?: string;
  formSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  landingPage?: string;
  referrer?: string;
  submittedAt: string;
  projectName: string;
};

export async function appendRosemontGroveLeadToGoogleSheet(
  lead: RosemontGroveLead,
): Promise<AppendResult> {
  const headers = [
    "Date",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Are You a Realtor",
    "Buying Timeframe",
    "Preferred Home Type",
    "Message",
    "Form Source",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "Landing Page",
    "Referrer",
    "Project",
  ];

  const row = [
    lead.submittedAt || new Date().toISOString(),
    lead.firstName,
    lead.lastName,
    lead.email,
    lead.phone,
    lead.isRealtor,
    lead.buyingTimeframe,
    lead.preferredHomeType,
    lead.message || "",
    lead.formSource || "",
    lead.utmSource || "",
    lead.utmMedium || "",
    lead.utmCampaign || "",
    lead.landingPage || "",
    lead.referrer || "",
    lead.projectName || "Rosemont Grove",
  ];

  return appendRowToSheet(
    process.env.GOOGLE_SHEETS_TAB_NAME || "Sheet1",
    row,
    headers,
  );
}
