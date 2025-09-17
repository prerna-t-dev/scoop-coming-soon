// Google Apps Script code for handling form submissions
// This code should be pasted into Google Apps Script editor

function doGet(e) {
  try {
    // Get data from URL parameters
    const email = e.parameter.email;
    const timestamp = e.parameter.timestamp || new Date().toISOString();
    const source = e.parameter.source || 'coming-soon-page';
    
    // Validate email
    if (!email) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, error: 'No email provided'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    if (!isValidEmail(email)) {
      return ContentService
        .createTextOutput(JSON.stringify({success: false, error: 'Invalid email format'}))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get or create the spreadsheet
    const spreadsheet = getOrCreateSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();
    
    // Check if email already exists (only if we have data)
    if (sheet.getLastRow() > 1) {
      const existingEmails = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat();
      if (existingEmails.includes(email)) {
        return ContentService
          .createTextOutput(JSON.stringify({success: false, error: 'Email already exists'}))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // Add new email to the sheet
    const newRow = [
      email,
      timestamp,
      source,
      new Date().toLocaleString()
    ];
    
    sheet.appendRow(newRow);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Email added successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    return ContentService
      .createTextOutput(JSON.stringify({success: false, error: 'Server error: ' + error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Keep the old doPost function for backward compatibility
function doPost(e) {
  return doGet(e);
}

function getOrCreateSpreadsheet() {
  const fileName = 'Scoop Email Subscriptions';
  
  try {
    // Try to find existing spreadsheet in root folder first
    const files = DriveApp.getFilesByName(fileName);
    
    if (files.hasNext()) {
      const file = files.next();
      return SpreadsheetApp.openById(file.getId());
    }
  } catch (error) {
    console.log('Error finding existing spreadsheet:', error);
  }
  
  // Create new spreadsheet
  const spreadsheet = SpreadsheetApp.create(fileName);
  const sheet = spreadsheet.getActiveSheet();
  
  // Set up headers
  sheet.getRange(1, 1, 1, 4).setValues([
    ['Email', 'Timestamp', 'Source', 'Date Added']
  ]);
  
  // Format headers
  sheet.getRange(1, 1, 1, 4).setFontWeight('bold');
  sheet.getRange(1, 1, 1, 4).setBackground('#f0f0f0');
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, 4);
  
  return spreadsheet;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Optional: Send confirmation email
function sendConfirmationEmail(email) {
  try {
    const subject = 'Welcome to Scoop - We\'ll be in touch!';
    const body = `
Hi there!

Thank you for signing up for updates from Scoop. We're excited to share our beautiful lingerie collection with you soon.

We'll notify you as soon as our shop opens!

Best,
The Scoop Team

---
Scoop - Lingerie that loves curves
Instagram: @shop_scoop_studio
    `;
    
    GmailApp.sendEmail(email, subject, body);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}

// Test function to verify the script works
function testFunction() {
  const mockEvent = {
    parameter: {
      email: 'test@example.com',
      timestamp: new Date().toISOString(),
      source: 'test'
    }
  };
  
  const result = doGet(mockEvent);
  console.log('Test result:', result.getContent());
  
  // Also test the spreadsheet creation
  try {
    const spreadsheet = getOrCreateSpreadsheet();
    console.log('Spreadsheet created/found:', spreadsheet.getName());
    console.log('Spreadsheet URL:', spreadsheet.getUrl());
  } catch (error) {
    console.error('Error with spreadsheet:', error);
  }
}
