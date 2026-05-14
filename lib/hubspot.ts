type RegistrationInput = {
  email: string;
  name: string;
  role: "player" | "game";
  experienceYears?: number;
  favoriteGameCategory?: string;
  location?: string;
  gameName?: string;
  yearsOnline?: number;
  gameType?: string;
};

function cleanProperties(properties: Record<string, string | undefined>) {
  return Object.fromEntries(Object.entries(properties).filter(([, value]) => value !== undefined && value !== ""));
}

export async function sendRegistrationToHubSpot(input: RegistrationInput) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;

  if (!token && (!portalId || !formGuid)) {
    return { skipped: true, reason: "HubSpot environment variables are not configured" };
  }

  const properties = cleanProperties({
    email: input.email,
    firstname: input.name,
    gaming_experience_years: input.experienceYears === undefined ? undefined : String(input.experienceYears),
    favorite_game_category: input.favoriteGameCategory,
    player_location: input.location,
    game_name: input.gameName,
    years_online: input.yearsOnline === undefined ? undefined : String(input.yearsOnline),
    game_type: input.gameType,
    vip_connector_role: input.role
  });

  if (token) {
    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ properties })
    });

    if (!response.ok && response.status !== 409) {
      const text = await response.text();
      throw new Error(`HubSpot contact sync failed: ${text}`);
    }

    return { skipped: false, method: "crm" };
  }

  const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: Object.entries(properties).map(([name, value]) => ({ name, value }))
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HubSpot form sync failed: ${text}`);
  }

  return { skipped: false, method: "forms" };
}
