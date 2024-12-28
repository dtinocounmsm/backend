const fs = require('fs');
const path = require('path');
const marked = require('marked');

// Config
const confluenceUsername = process.env.CONFLUENCE_USER || '';
const confluenceApiToken = process.env.CONFLUENCE_API_KEY || '';
const confluenceBaseUrl = process.env.CONFLUENCE_BASE_URL || '';
const confluencePageId = process.env.CONFLUENCE_PAGE_ID || '';

// Validate config values
if (
  !confluenceBaseUrl ||
  !confluencePageId ||
  !confluenceUsername ||
  !confluenceApiToken
) {
  throw new Error('Missing required environment variables');
}

const confluenceIdentifier = `${confluenceUsername}:${confluenceApiToken}`;

// Read CHANGELOG.md file
const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');
const changelogContent = fs.readFileSync(changelogPath, 'utf8');

// Parse Markdown to HTML
const changelogHtml = marked.parse(changelogContent);

// wrap the HTML in Confluence storage format
const changelogXhtml = `<div>${changelogHtml}</div>`;

// Get the content of the existing page
async function getPageContent(pageId) {
  const response = await fetch(`${confluenceBaseUrl}/content/${pageId}`, {
    method: 'GET',
    headers: {
      Authorization: `Basic ${Buffer.from(confluenceIdentifier).toString(
        'base64',
      )}`,
      Accept: 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error(`Error al obtener la página: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

// Update the content of the page
async function updatePageContent(pageId, newContent, version) {
  const response = await fetch(`${confluenceBaseUrl}/content/${pageId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Basic ${Buffer.from(confluenceIdentifier).toString(
        'base64',
      )}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      id: pageId,
      type: 'page',
      title: 'Backend - CHANGELOG', // Puedes mantener el título existente o cambiarlo si lo deseas
      body: {
        storage: {
          value: newContent,
          representation: 'storage',
        },
      },
      version: {
        number: version + 1,
      },
    }),
  });
  if (!response.ok) {
    throw new Error(`Error updating the page: ${response.statusText}`);
  }
  const data = await response.json();
  return data;
}

async function main() {
  try {
    // Get the information of the existing page
    const pageData = await getPageContent(confluencePageId);
    const currentVersion = pageData.version.number;

    // Update the page with the new content
    // const updatedPage = await updatePageContent(confluencePageId, changelogXhtml, currentVersion);
    await updatePageContent(confluencePageId, changelogXhtml, currentVersion);

    // console.log('Page successfully updated:', updatedPage);
    console.log('Page successfully updated:');
  } catch (error) {
    console.error('Error updating the page:', error);
  }
}

main();
