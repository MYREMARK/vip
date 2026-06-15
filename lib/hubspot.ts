type RegistrationInput = {
  email: string;
  name: string;
  role: "player" | "game";
  // Participant fields
  experienceYears?: number;
  igamingSector?: string;
  location?: string;
  // Operator fields
  organisationName?: string;
  jobTitle?: string;
  businessArea?: string;
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
    vip_connector_role: input.role,
    // Participant
    gaming_experience_years: input.experienceYears === undefined ? undefined : String(input.experienceYears),
    igaming_sector: input.igamingSector,
    player_location: input.location,
    // Operator
    company: input.organisationName,
    jobtitle: input.jobTitle,
    igaming_business_area: input.businessArea
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
