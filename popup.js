// // // // document.addEventListener("DOMContentLoaded", async () => {
// // // //     const CLIENT_ID = '496812821584-uum3k881ek464qcfa49fldbngtv5vvtv.apps.googleusercontent.com';
// // // //     const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.events';
  
// // // //     chrome.identity.getAuthToken({ interactive: true }, async function (token) {
// // // //       if (chrome.runtime.lastError || !token) {
// // // //         alert("Authorization failed.");
// // // //         return;
// // // //       }
  
// // // //       const gmailRes = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=1&q=is:unread', {
// // // //         headers: { Authorization: 'Bearer ' + token }
// // // //       });
  
// // // //       const gmailData = await gmailRes.json();
// // // //       if (!gmailData.messages || gmailData.messages.length === 0) {
// // // //         alert('No new unread emails found.');
// // // //         return;
// // // //       }
  
// // // //       const messageId = gmailData.messages[0].id;
// // // //       const messageRes = await fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`, {
// // // //         headers: { Authorization: 'Bearer ' + token }
// // // //       });
  
// // // //       const messageData = await messageRes.json();
// // // //       const headers = messageData.payload.headers;
// // // //       const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
  
// // // //       // Decode body
// // // //       let body = '';
// // // //       if (messageData.payload.parts && messageData.payload.parts.length > 0) {
// // // //         const part = messageData.payload.parts.find(p => p.mimeType === 'text/plain');
// // // //         if (part?.body?.data) {
// // // //           body = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
// // // //         }
// // // //       } else if (messageData.payload.body?.data) {
// // // //         body = atob(messageData.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
// // // //       }
  
// // // //       // Match time and date
// // // //       const dateRegex = /(?:on\s*)?(?:(\d{1,2})(st|nd|rd|th)?\s*(?:of\s*)?(july)|july\s*(\d{1,2}))/i;
// // // //       const timeRegex = /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i;
  
// // // //       const dateMatch = body.match(dateRegex);
// // // //       const timeMatch = body.match(timeRegex);
  
// // // //       if (!dateMatch || !timeMatch) {
// // // //         alert("No interview date/time found in email body.");
// // // //         return;
// // // //       }
  
// // // //       // Extract day
// // // //       let day = dateMatch[1] || dateMatch[4];
// // // //       if (!day) {
// // // //         alert("Could not extract date.");
// // // //         return;
// // // //       }
// // // //       day = day.padStart(2, '0');
  
// // // //       const hour = parseInt(timeMatch[1]);
// // // //       const minute = parseInt(timeMatch[2] || '0');
// // // //       const meridian = timeMatch[3].toLowerCase();
  
// // // //       let hr24 = meridian === 'pm' && hour !== 12 ? hour + 12 : hour;
// // // //       if (meridian === 'am' && hour === 12) hr24 = 0;
  
// // // //       const eventDate = new Date(`2025-07-${day}T${hr24.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:00+05:30`);
  
// // // //       createCalendarEvent(token, subject, body, eventDate.toISOString());
// // // //     });
  
// // // //     function createCalendarEvent(token, summary, description, dateTime) {
// // // //       const event = {
// // // //         summary,
// // // //         description,
// // // //         start: {
// // // //           dateTime,
// // // //           timeZone: 'Asia/Kolkata'
// // // //         },
// // // //         end: {
// // // //           dateTime: new Date(new Date(dateTime).getTime() + 60 * 60 * 1000).toISOString(),
// // // //           timeZone: 'Asia/Kolkata'
// // // //         }
// // // //       };
  
// // // //       fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
// // // //         method: "POST",
// // // //         headers: {
// // // //           Authorization: "Bearer " + token,
// // // //           "Content-Type": "application/json"
// // // //         },
// // // //         body: JSON.stringify(event)
// // // //       })
// // // //         .then(res => res.json())
// // // //         .then(data => {
// // // //           if (data.id) {
// // // //             alert("✅ Event added to Google Calendar!");
// // // //           } else {
// // // //             console.error("Calendar API error:", data);
// // // //             alert("❌ Failed to add event.");
// // // //           }
// // // //         })
// // // //         .catch(err => {
// // // //           console.error("Fetch error:", err);
// // // //           alert("❌ Error adding event.");
// // // //         });
// // // //     }
// // // //   });
  







// // // document.addEventListener("DOMContentLoaded", async () => {
// // //   const CLIENT_ID = '496812821584-uum3k881ek464qcfa49fldbngtv5vvtv.apps.googleusercontent.com';
// // //   const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.events';

// // //   chrome.identity.getAuthToken({ interactive: true }, async function (token) {
// // //     if (chrome.runtime.lastError || !token) {
// // //       alert("Authorization failed.");
// // //       return;
// // //     }

// // //     const gmailRes = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=1&q=is:unread', {
// // //       headers: { Authorization: 'Bearer ' + token }
// // //     });

// // //     const gmailData = await gmailRes.json();
// // //     if (!gmailData.messages || gmailData.messages.length === 0) {
// // //       alert('No new unread emails found.');
// // //       return;
// // //     }

// // //     const messageId = gmailData.messages[0].id;
// // //     const messageRes = await fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`, {
// // //       headers: { Authorization: 'Bearer ' + token }
// // //     });

// // //     const messageData = await messageRes.json();
// // //     const headers = messageData.payload.headers;
// // //     const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';

// // //     // Decode body
// // //     let body = '';
// // //     if (messageData.payload.parts && messageData.payload.parts.length > 0) {
// // //       const part = messageData.payload.parts.find(p => p.mimeType === 'text/plain');
// // //       if (part?.body?.data) {
// // //         body = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
// // //       }
// // //     } else if (messageData.payload.body?.data) {
// // //       body = atob(messageData.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
// // //     }

// // //     // Enhanced date and time extraction
// // //     const extractedDateTime = extractDateTimeFromText(body);
    
// // //     if (!extractedDateTime) {
// // //       alert("No meeting date/time found in email body.");
// // //       return;
// // //     }

// // //     console.log("Extracted DateTime:", extractedDateTime);
// // //     createCalendarEvent(token, subject, body, extractedDateTime.toISOString());
// // //   });

// // //   function extractDateTimeFromText(text) {
// // //     // Month names mapping
// // //     const months = {
// // //       'january': 0, 'jan': 0,
// // //       'february': 1, 'feb': 1,
// // //       'march': 2, 'mar': 2,
// // //       'april': 3, 'apr': 3,
// // //       'may': 4,
// // //       'june': 5, 'jun': 5,
// // //       'july': 6, 'jul': 7,
// // //       'august': 7, 'aug': 7,
// // //       'september': 8, 'sep': 8, 'sept': 8,
// // //       'october': 9, 'oct': 9,
// // //       'november': 10, 'nov': 10,
// // //       'december': 11, 'dec': 11
// // //     };

// // //     // Various date patterns
// // //     const datePatterns = [
// // //       // MM/DD/YYYY or MM-DD-YYYY
// // //       /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
// // //       // DD/MM/YYYY or DD-MM-YYYY
// // //       /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
// // //       // Month DD, YYYY (e.g., "July 25, 2025")
// // //       /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/i,
// // //       // DD Month YYYY (e.g., "25 July 2025")
// // //       /(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{4})/i,
// // //       // Month DD (current year assumed) (e.g., "July 25")
// // //       /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?/i,
// // //       // DD Month (current year assumed) (e.g., "25 July")
// // //       /(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)/i,
// // //       // Today, Tomorrow, specific days
// // //       /(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
// // //       // Next week, this week patterns
// // //       /(next|this)\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i
// // //     ];

// // //     // Time patterns
// // //     const timePatterns = [
// // //       // 12-hour format with AM/PM
// // //       /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i,
// // //       // 24-hour format
// // //       /(\d{1,2}):(\d{2})/,
// // //       // Hour only (e.g., "at 3")
// // //       /at\s+(\d{1,2})/i
// // //     ];

// // //     let dateFound = null;
// // //     let timeFound = null;

// // //     // Extract date
// // //     for (const pattern of datePatterns) {
// // //       const match = text.match(pattern);
// // //       if (match) {
// // //         dateFound = parseDate(match);
// // //         if (dateFound) break;
// // //       }
// // //     }

// // //     // Extract time
// // //     for (const pattern of timePatterns) {
// // //       const match = text.match(pattern);
// // //       if (match) {
// // //         timeFound = parseTime(match);
// // //         if (timeFound) break;
// // //       }
// // //     }

// // //     // Combine date and time
// // //     if (dateFound && timeFound) {
// // //       dateFound.setHours(timeFound.hours, timeFound.minutes, 0, 0);
// // //       return dateFound;
// // //     } else if (dateFound) {
// // //       // Default to 9 AM if no time specified
// // //       dateFound.setHours(9, 0, 0, 0);
// // //       return dateFound;
// // //     }

// // //     return null;

// // //     function parseDate(match) {
// // //       const currentYear = new Date().getFullYear();
// // //       const today = new Date();

// // //       // Handle different date formats
// // //       if (match[0].match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}/)) {
// // //         // MM/DD/YYYY format (assuming US format, adjust as needed)
// // //         const month = parseInt(match[1]) - 1;
// // //         const day = parseInt(match[2]);
// // //         const year = parseInt(match[3]);
// // //         return new Date(year, month, day);
// // //       }

// // //       // Month name patterns
// // //       if (match[1] && months.hasOwnProperty(match[1].toLowerCase())) {
// // //         const monthName = match[1].toLowerCase();
// // //         const month = months[monthName];
// // //         const day = parseInt(match[2]);
// // //         const year = match[3] ? parseInt(match[3]) : currentYear;
// // //         return new Date(year, month, day);
// // //       }

// // //       // DD Month YYYY pattern
// // //       if (match[2] && months.hasOwnProperty(match[2].toLowerCase())) {
// // //         const day = parseInt(match[1]);
// // //         const monthName = match[2].toLowerCase();
// // //         const month = months[monthName];
// // //         const year = match[3] ? parseInt(match[3]) : currentYear;
// // //         return new Date(year, month, day);
// // //       }

// // //       // Relative dates
// // //       const dayText = match[1] ? match[1].toLowerCase() : match[0].toLowerCase();
      
// // //       if (dayText === 'today') {
// // //         return new Date(today);
// // //       }
      
// // //       if (dayText === 'tomorrow') {
// // //         const tomorrow = new Date(today);
// // //         tomorrow.setDate(today.getDate() + 1);
// // //         return tomorrow;
// // //       }

// // //       // Day of week
// // //       const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
// // //       const dayIndex = dayOfWeek.indexOf(dayText);
      
// // //       if (dayIndex !== -1) {
// // //         const targetDate = new Date(today);
// // //         const currentDay = today.getDay();
// // //         let daysUntil = dayIndex - currentDay;
        
// // //         // If the day has passed this week, move to next week
// // //         if (daysUntil <= 0) {
// // //           daysUntil += 7;
// // //         }
        
// // //         targetDate.setDate(today.getDate() + daysUntil);
// // //         return targetDate;
// // //       }

// // //       // Next/This week patterns
// // //       if (match[1] && match[2]) {
// // //         const modifier = match[1].toLowerCase();
// // //         const day = match[2].toLowerCase();
// // //         const dayIndex = dayOfWeek.indexOf(day);
        
// // //         if (dayIndex !== -1) {
// // //           const targetDate = new Date(today);
// // //           const currentDay = today.getDay();
// // //           let daysUntil = dayIndex - currentDay;
          
// // //           if (modifier === 'next') {
// // //             daysUntil += 7;
// // //           } else if (modifier === 'this' && daysUntil <= 0) {
// // //             daysUntil += 7;
// // //           }
          
// // //           targetDate.setDate(today.getDate() + daysUntil);
// // //           return targetDate;
// // //         }
// // //       }

// // //       return null;
// // //     }

// // //     function parseTime(match) {
// // //       let hours = parseInt(match[1]);
// // //       const minutes = match[2] ? parseInt(match[2]) : 0;
// // //       const meridian = match[3] ? match[3].toLowerCase() : null;

// // //       // Convert to 24-hour format
// // //       if (meridian === 'pm' && hours !== 12) {
// // //         hours += 12;
// // //       } else if (meridian === 'am' && hours === 12) {
// // //         hours = 0;
// // //       }

// // //       // Validate time
// // //       if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
// // //         return { hours, minutes };
// // //       }

// // //       return null;
// // //     }
// // //   }

// // //   function createCalendarEvent(token, summary, description, dateTime) {
// // //     const event = {
// // //       summary,
// // //       description,
// // //       start: {
// // //         dateTime,
// // //         timeZone: 'Asia/Kolkata'
// // //       },
// // //       end: {
// // //         dateTime: new Date(new Date(dateTime).getTime() + 60 * 60 * 1000).toISOString(),
// // //         timeZone: 'Asia/Kolkata'
// // //       }
// // //     };

// // //     fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
// // //       method: "POST",
// // //       headers: {
// // //         Authorization: "Bearer " + token,
// // //         "Content-Type": "application/json"
// // //       },
// // //       body: JSON.stringify(event)
// // //     })
// // //       .then(res => res.json())
// // //       .then(data => {
// // //         if (data.id) {
// // //           alert("✅ Event added to Google Calendar!");
// // //         } else {
// // //           console.error("Calendar API error:", data);
// // //           alert("❌ Failed to add event.");
// // //         }
// // //       })
// // //       .catch(err => {
// // //         console.error("Fetch error:", err);
// // //         alert("❌ Error adding event.");
// // //       });
// // //   }
// // // });





// // document.addEventListener("DOMContentLoaded", async () => {
// //   const CLIENT_ID = '496812821584-uum3k881ek464qcfa49fldbngtv5vvtv.apps.googleusercontent.com';
// //   const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.events';
  
// //   const processBtn = document.getElementById('processEmails');
// //   const emailInfo = document.getElementById('emailInfo');
// //   const loading = document.getElementById('loading');
// //   const status = document.getElementById('status');
  
// //   // UI Helper functions
// //   function showLoading() {
// //     loading.style.display = 'block';
// //     processBtn.disabled = true;
// //     emailInfo.classList.remove('show');
// //     status.style.display = 'none';
// //   }
  
// //   function hideLoading() {
// //     loading.style.display = 'none';
// //     processBtn.disabled = false;
// //   }
  
// //   function showStatus(message, type) {
// //     status.textContent = message;
// //     status.className = `status ${type}`;
// //     status.style.display = 'block';
// //   }
  
// //   function displayEmailInfo(emailData) {
// //     document.getElementById('emailSubject').textContent = emailData.subject;
// //     document.getElementById('emailSender').textContent = emailData.sender;
// //     document.getElementById('emailDate').textContent = new Date(emailData.emailDate).toLocaleString();
// //     document.getElementById('eventDate').textContent = emailData.extractedDateTime.toLocaleString();
// //     emailInfo.classList.add('show');
// //   }
  
// //   processBtn.addEventListener('click', async () => {
// //     showLoading();
// //     showStatus('Connecting to Gmail...', 'processing');
    
// //     chrome.identity.getAuthToken({ interactive: true }, async function (token) {
// //       if (chrome.runtime.lastError || !token) {
// //         hideLoading();
// //         showStatus('Authorization failed. Please try again.', 'error');
// //         return;
// //       }
      
// //       try {
// //         showStatus('Fetching latest unread email...', 'processing');
        
// //         const gmailRes = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=1&q=is:unread', {
// //           headers: { Authorization: 'Bearer ' + token }
// //         });
  
// //         const gmailData = await gmailRes.json();
// //         if (!gmailData.messages || gmailData.messages.length === 0) {
// //           hideLoading();
// //           showStatus('No new unread emails found.', 'error');
// //           return;
// //         }
  
// //         showStatus('Processing email content...', 'processing');
        
// //         const messageId = gmailData.messages[0].id;
// //         const messageRes = await fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`, {
// //           headers: { Authorization: 'Bearer ' + token }
// //         });
  
// //         const messageData = await messageRes.json();
// //         const headers = messageData.payload.headers;
// //         const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
  
// //         // Decode body
// //         let body = '';
// //         if (messageData.payload.parts && messageData.payload.parts.length > 0) {
// //           const part = messageData.payload.parts.find(p => p.mimeType === 'text/plain');
// //           if (part?.body?.data) {
// //             body = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
// //           }
// //         } else if (messageData.payload.body?.data) {
// //           body = atob(messageData.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
// //         }
  
// //         showStatus('Extracting date and time...', 'processing');
        
// //         // Enhanced date and time extraction
// //         const extractedDateTime = extractDateTimeFromText(body);
        
// //         if (!extractedDateTime) {
// //           hideLoading();
// //           showStatus('No meeting date/time found in email body.', 'error');
// //           return;
// //         }
  
// //         // Get sender information
// //         const senderHeader = headers.find(h => h.name === 'From')?.value || 'Unknown Sender';
// //         const dateHeader = headers.find(h => h.name === 'Date')?.value || 'Unknown Date';
        
// //         // Create email info object
// //         const emailInfoData = {
// //           subject: subject,
// //           sender: senderHeader,
// //           emailDate: dateHeader,
// //           messageId: messageId,
// //           extractedDateTime: extractedDateTime
// //         };
        
// //         // Display email information
// //         displayEmailInfo(emailInfoData);
        
// //         showStatus('Creating calendar event...', 'processing');
        
// //         await createCalendarEvent(token, subject, body, extractedDateTime.toISOString(), emailInfoData);
        
// //       } catch (error) {
// //         console.error('Error processing email:', error);
// //         hideLoading();
// //         showStatus('Error processing email. Please try again.', 'error');
// //       }
// //     });
// //   });

// //   function extractDateTimeFromText(text) {
// //     // Month names mapping
// //     const months = {
// //       'january': 0, 'jan': 0,
// //       'february': 1, 'feb': 1,
// //       'march': 2, 'mar': 2,
// //       'april': 3, 'apr': 3,
// //       'may': 4,
// //       'june': 5, 'jun': 5,
// //       'july': 6, 'jul': 7,
// //       'august': 7, 'aug': 7,
// //       'september': 8, 'sep': 8, 'sept': 8,
// //       'october': 9, 'oct': 9,
// //       'november': 10, 'nov': 10,
// //       'december': 11, 'dec': 11
// //     };

// //     // Various date patterns
// //     const datePatterns = [
// //       // MM/DD/YYYY or MM-DD-YYYY
// //       /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
// //       // DD/MM/YYYY or DD-MM-YYYY
// //       /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
// //       // Month DD, YYYY (e.g., "July 25, 2025")
// //       /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/i,
// //       // DD Month YYYY (e.g., "25 July 2025")
// //       /(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{4})/i,
// //       // Month DD (current year assumed) (e.g., "July 25")
// //       /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?/i,
// //       // DD Month (current year assumed) (e.g., "25 July")
// //       /(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)/i,
// //       // Today, Tomorrow, specific days
// //       /(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
// //       // Next week, this week patterns
// //       /(next|this)\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i
// //     ];

// //     // Time patterns
// //     const timePatterns = [
// //       // 12-hour format with AM/PM
// //       /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i,
// //       // 24-hour format
// //       /(\d{1,2}):(\d{2})/,
// //       // Hour only (e.g., "at 3")
// //       /at\s+(\d{1,2})/i
// //     ];

// //     let dateFound = null;
// //     let timeFound = null;

// //     // Extract date
// //     for (const pattern of datePatterns) {
// //       const match = text.match(pattern);
// //       if (match) {
// //         dateFound = parseDate(match);
// //         if (dateFound) break;
// //       }
// //     }

// //     // Extract time
// //     for (const pattern of timePatterns) {
// //       const match = text.match(pattern);
// //       if (match) {
// //         timeFound = parseTime(match);
// //         if (timeFound) break;
// //       }
// //     }

// //     // Combine date and time
// //     if (dateFound && timeFound) {
// //       dateFound.setHours(timeFound.hours, timeFound.minutes, 0, 0);
// //       return dateFound;
// //     } else if (dateFound) {
// //       // Default to 9 AM if no time specified
// //       dateFound.setHours(9, 0, 0, 0);
// //       return dateFound;
// //     }

// //     return null;

// //     function parseDate(match) {
// //       const currentYear = new Date().getFullYear();
// //       const today = new Date();

// //       // Handle different date formats
// //       if (match[0].match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}/)) {
// //         // MM/DD/YYYY format (assuming US format, adjust as needed)
// //         const month = parseInt(match[1]) - 1;
// //         const day = parseInt(match[2]);
// //         const year = parseInt(match[3]);
// //         return new Date(year, month, day);
// //       }

// //       // Month name patterns
// //       if (match[1] && months.hasOwnProperty(match[1].toLowerCase())) {
// //         const monthName = match[1].toLowerCase();
// //         const month = months[monthName];
// //         const day = parseInt(match[2]);
// //         const year = match[3] ? parseInt(match[3]) : currentYear;
// //         return new Date(year, month, day);
// //       }

// //       // DD Month YYYY pattern
// //       if (match[2] && months.hasOwnProperty(match[2].toLowerCase())) {
// //         const day = parseInt(match[1]);
// //         const monthName = match[2].toLowerCase();
// //         const month = months[monthName];
// //         const year = match[3] ? parseInt(match[3]) : currentYear;
// //         return new Date(year, month, day);
// //       }

// //       // Relative dates
// //       const dayText = match[1] ? match[1].toLowerCase() : match[0].toLowerCase();
      
// //       if (dayText === 'today') {
// //         return new Date(today);
// //       }
      
// //       if (dayText === 'tomorrow') {
// //         const tomorrow = new Date(today);
// //         tomorrow.setDate(today.getDate() + 1);
// //         return tomorrow;
// //       }

// //       // Day of week
// //       const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
// //       const dayIndex = dayOfWeek.indexOf(dayText);
      
// //       if (dayIndex !== -1) {
// //         const targetDate = new Date(today);
// //         const currentDay = today.getDay();
// //         let daysUntil = dayIndex - currentDay;
        
// //         // If the day has passed this week, move to next week
// //         if (daysUntil <= 0) {
// //           daysUntil += 7;
// //         }
        
// //         targetDate.setDate(today.getDate() + daysUntil);
// //         return targetDate;
// //       }

// //       // Next/This week patterns
// //       if (match[1] && match[2]) {
// //         const modifier = match[1].toLowerCase();
// //         const day = match[2].toLowerCase();
// //         const dayIndex = dayOfWeek.indexOf(day);
        
// //         if (dayIndex !== -1) {
// //           const targetDate = new Date(today);
// //           const currentDay = today.getDay();
// //           let daysUntil = dayIndex - currentDay;
          
// //           if (modifier === 'next') {
// //             daysUntil += 7;
// //           } else if (modifier === 'this' && daysUntil <= 0) {
// //             daysUntil += 7;
// //           }
          
// //           targetDate.setDate(today.getDate() + daysUntil);
// //           return targetDate;
// //         }
// //       }

// //       return null;
// //     }

// //     function parseTime(match) {
// //       let hours = parseInt(match[1]);
// //       const minutes = match[2] ? parseInt(match[2]) : 0;
// //       const meridian = match[3] ? match[3].toLowerCase() : null;

// //       // Convert to 24-hour format
// //       if (meridian === 'pm' && hours !== 12) {
// //         hours += 12;
// //       } else if (meridian === 'am' && hours === 12) {
// //         hours = 0;
// //       }

// //       // Validate time
// //       if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
// //         return { hours, minutes };
// //       }

// //       return null;
// //     }
// //   }

// //   async function createCalendarEvent(token, summary, description, dateTime, emailInfo) {
// //     const event = {
// //       summary,
// //       description: `${description}\n\n--- Event Details ---\nFrom Email: ${emailInfo.subject}\nSender: ${emailInfo.sender}\nEmail Date: ${emailInfo.emailDate}\nExtracted Date/Time: ${emailInfo.extractedDateTime.toLocaleString()}`,
// //       start: {
// //         dateTime,
// //         timeZone: 'Asia/Kolkata'
// //       },
// //       end: {
// //         dateTime: new Date(new Date(dateTime).getTime() + 60 * 60 * 1000).toISOString(),
// //         timeZone: 'Asia/Kolkata'
// //       }
// //     };

// //     try {
// //       const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
// //         method: "POST",
// //         headers: {
// //           Authorization: "Bearer " + token,
// //           "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify(event)
// //       });
      
// //       const data = await response.json();
      
// //       if (data.id) {
// //         hideLoading();
// //         showStatus(`✅ Event created successfully! Calendar ID: ${data.id}`, 'success');
        
// //         // Log for debugging
// //         console.log("Calendar Event Created:", {
// //           calendarEventId: data.id,
// //           emailInfo: emailInfo,
// //           calendarEventUrl: data.htmlLink
// //         });
// //       } else {
// //         console.error("Calendar API error:", data);
// //         hideLoading();
// //         showStatus(`❌ Failed to create calendar event`, 'error');
// //       }
// //     } catch (error) {
// //       console.error("Fetch error:", error);
// //       hideLoading();
// //       showStatus(`❌ Error creating calendar event`, 'error');
// //     }
// //   }
// // });








document.addEventListener("DOMContentLoaded", () => {
  const CLIENT_ID = '496812821584-uum3k881ek464qcfa49fldbngtv5vvtv.apps.googleusercontent.com';
  const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar.events';
  
  // Get the login button
  const loginButton = document.getElementById('login');
  
  if (!loginButton) {
      console.error('Login button not found!');
      alert('Error: Login button not found in popup.');
      return;
  }
  
  // Add click event listener to the login button
  loginButton.addEventListener('click', async () => {
      console.log('Login button clicked!');
      
      // Disable button and show loading state
      loginButton.disabled = true;
      loginButton.textContent = 'Processing...';
      
      chrome.identity.getAuthToken({ interactive: true }, async function (token) {
          if (chrome.runtime.lastError || !token) {
              console.error('Authorization failed:', chrome.runtime.lastError);
              alert("Authorization failed. Please try again.");
              resetButton();
              return;
          }
          
          console.log('Token received:', token ? 'Yes' : 'No');
          
          try {
              // Fetch latest unread email
              console.log('Fetching Gmail messages...');
              const gmailRes = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=1&q=is:unread', {
                  headers: { Authorization: 'Bearer ' + token }
              });
      
              if (!gmailRes.ok) {
                  throw new Error(`Gmail API error: ${gmailRes.status}`);
              }
      
              const gmailData = await gmailRes.json();
              console.log('Gmail data:', gmailData);
              
              if (!gmailData.messages || gmailData.messages.length === 0) {
                  alert('No new unread emails found.');
                  resetButton();
                  return;
              }
      
              const messageId = gmailData.messages[0].id;
              console.log('Processing message ID:', messageId);
              
              const messageRes = await fetch(`https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}?format=full`, {
                  headers: { Authorization: 'Bearer ' + token }
              });
      
              if (!messageRes.ok) {
                  throw new Error(`Gmail message API error: ${messageRes.status}`);
              }
      
              const messageData = await messageRes.json();
              const headers = messageData.payload.headers;
              const subject = headers.find(h => h.name === 'Subject')?.value || 'No Subject';
      
              // Decode body
              let body = '';
              if (messageData.payload.parts && messageData.payload.parts.length > 0) {
                  const part = messageData.payload.parts.find(p => p.mimeType === 'text/plain');
                  if (part?.body?.data) {
                      body = atob(part.body.data.replace(/-/g, '+').replace(/_/g, '/'));
                  }
              } else if (messageData.payload.body?.data) {
                  body = atob(messageData.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
              }
      
              console.log('Email subject:', subject);
              console.log('Email body length:', body.length);
      
              // Enhanced date and time extraction
              const extractedDateTime = extractDateTimeFromText(body);
              
              if (!extractedDateTime) {
                  alert("No meeting date/time found in email body.");
                  resetButton();
                  return;
              }
      
              console.log("Extracted DateTime:", extractedDateTime);
              
              // Get sender information
              const senderHeader = headers.find(h => h.name === 'From')?.value || 'Unknown Sender';
              const dateHeader = headers.find(h => h.name === 'Date')?.value || 'Unknown Date';
              
              // Create email info object
              const emailInfo = {
                  subject: subject,
                  sender: senderHeader,
                  emailDate: dateHeader,
                  messageId: messageId,
                  extractedDateTime: extractedDateTime
              };
              
              console.log('Email info:', emailInfo);
              
              // Create calendar event
              await createCalendarEvent(token, subject, body, extractedDateTime.toISOString(), emailInfo);
              
          } catch (error) {
              console.error('Error processing email:', error);
              alert(`Error processing email: ${error.message}`);
              resetButton();
          }
      });
  });
  
  function resetButton() {
      loginButton.disabled = false;
      loginButton.textContent = 'Login with Google';
  }

  function extractDateTimeFromText(text) {
      // Month names mapping
      const months = {
          'january': 0, 'jan': 0,
          'february': 1, 'feb': 1,
          'march': 2, 'mar': 2,
          'april': 3, 'apr': 3,
          'may': 4,
          'june': 5, 'jun': 5,
          'july': 6, 'jul': 6,
          'august': 7, 'aug': 7,
          'september': 8, 'sep': 8, 'sept': 8,
          'october': 9, 'oct': 9,
          'november': 10, 'nov': 10,
          'december': 11, 'dec': 11
      };

      // Various date patterns
      const datePatterns = [
          // MM/DD/YYYY or MM-DD-YYYY
          /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
          // DD/MM/YYYY or DD-MM-YYYY
          /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
          // Month DD, YYYY (e.g., "July 25, 2025")
          /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+(\d{4})/i,
          // DD Month YYYY (e.g., "25 July 2025")
          /(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{4})/i,
          // Month DD (current year assumed) (e.g., "July 25")
          /(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)\s+(\d{1,2})(?:st|nd|rd|th)?/i,
          // DD Month (current year assumed) (e.g., "25 July")
          /(\d{1,2})(?:st|nd|rd|th)?\s+(january|february|march|april|may|june|july|august|september|october|november|december|jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)/i,
          // Today, Tomorrow, specific days
          /(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i,
          // Next week, this week patterns
          /(next|this)\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i
      ];

      // Time patterns
      const timePatterns = [
          // 12-hour format with AM/PM
          /(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i,
          // 24-hour format
          /(\d{1,2}):(\d{2})/,
          // Hour only (e.g., "at 3")
          /at\s+(\d{1,2})/i
      ];

      let dateFound = null;
      let timeFound = null;

      // Extract date
      for (const pattern of datePatterns) {
          const match = text.match(pattern);
          if (match) {
              dateFound = parseDate(match);
              if (dateFound) break;
          }
      }

      // Extract time
      for (const pattern of timePatterns) {
          const match = text.match(pattern);
          if (match) {
              timeFound = parseTime(match);
              if (timeFound) break;
          }
      }

      // Combine date and time
      if (dateFound && timeFound) {
          dateFound.setHours(timeFound.hours, timeFound.minutes, 0, 0);
          return dateFound;
      } else if (dateFound) {
          // Default to 9 AM if no time specified
          dateFound.setHours(9, 0, 0, 0);
          return dateFound;
      }

      return null;

      function parseDate(match) {
          const currentYear = new Date().getFullYear();
          const today = new Date();

          // Handle different date formats
          if (match[0].match(/\d{1,2}[\/\-]\d{1,2}[\/\-]\d{4}/)) {
              // MM/DD/YYYY format (assuming US format, adjust as needed)
              const month = parseInt(match[1]) - 1;
              const day = parseInt(match[2]);
              const year = parseInt(match[3]);
              return new Date(year, month, day);
          }

          // Month name patterns
          if (match[1] && months.hasOwnProperty(match[1].toLowerCase())) {
              const monthName = match[1].toLowerCase();
              const month = months[monthName];
              const day = parseInt(match[2]);
              const year = match[3] ? parseInt(match[3]) : currentYear;
              return new Date(year, month, day);
          }

          // DD Month YYYY pattern
          if (match[2] && months.hasOwnProperty(match[2].toLowerCase())) {
              const day = parseInt(match[1]);
              const monthName = match[2].toLowerCase();
              const month = months[monthName];
              const year = match[3] ? parseInt(match[3]) : currentYear;
              return new Date(year, month, day);
          }

          // Relative dates
          const dayText = match[1] ? match[1].toLowerCase() : match[0].toLowerCase();
          
          if (dayText === 'today') {
              return new Date(today);
          }
          
          if (dayText === 'tomorrow') {
              const tomorrow = new Date(today);
              tomorrow.setDate(today.getDate() + 1);
              return tomorrow;
          }

          // Day of week
          const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
          const dayIndex = dayOfWeek.indexOf(dayText);
          
          if (dayIndex !== -1) {
              const targetDate = new Date(today);
              const currentDay = today.getDay();
              let daysUntil = dayIndex - currentDay;
              
              // If the day has passed this week, move to next week
              if (daysUntil <= 0) {
                  daysUntil += 7;
              }
              
              targetDate.setDate(today.getDate() + daysUntil);
              return targetDate;
          }

          // Next/This week patterns
          if (match[1] && match[2]) {
              const modifier = match[1].toLowerCase();
              const day = match[2].toLowerCase();
              const dayIndex = dayOfWeek.indexOf(day);
              
              if (dayIndex !== -1) {
                  const targetDate = new Date(today);
                  const currentDay = today.getDay();
                  let daysUntil = dayIndex - currentDay;
                  
                  if (modifier === 'next') {
                      daysUntil += 7;
                  } else if (modifier === 'this' && daysUntil <= 0) {
                      daysUntil += 7;
                  }
                  
                  targetDate.setDate(today.getDate() + daysUntil);
                  return targetDate;
              }
          }

          return null;
      }

      function parseTime(match) {
          let hours = parseInt(match[1]);
          const minutes = match[2] ? parseInt(match[2]) : 0;
          const meridian = match[3] ? match[3].toLowerCase() : null;

          // Convert to 24-hour format
          if (meridian === 'pm' && hours !== 12) {
              hours += 12;
          } else if (meridian === 'am' && hours === 12) {
              hours = 0;
          }

          // Validate time
          if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
              return { hours, minutes };
          }

          return null;
      }
  }

  async function createCalendarEvent(token, summary, description, dateTime, emailInfo) {
      const event = {
          summary,
          description: `${description}\n\n--- Event Details ---\nFrom Email: ${emailInfo.subject}\nSender: ${emailInfo.sender}\nEmail Date: ${emailInfo.emailDate}\nExtracted Date/Time: ${emailInfo.extractedDateTime.toLocaleString()}`,
          start: {
              dateTime,
              timeZone: 'Asia/Kolkata'
          },
          end: {
              dateTime: new Date(new Date(dateTime).getTime() + 60 * 60 * 1000).toISOString(),
              timeZone: 'Asia/Kolkata'
          }
      };

      try {
          console.log('Creating calendar event...');
          
          const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
              method: "POST",
              headers: {
                  Authorization: "Bearer " + token,
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(event)
          });
          
          const data = await response.json();
          
          if (data.id) {
              // Create detailed success message
              const successMessage = `✅ Event Added Successfully!\n\n` +
                  `📧 Email: ${emailInfo.subject}\n` +
                  `👤 From: ${emailInfo.sender}\n` +
                  `📅 Event Date: ${emailInfo.extractedDateTime.toLocaleDateString()}\n` +
                  `⏰ Event Time: ${emailInfo.extractedDateTime.toLocaleTimeString()}\n` +
                  `🔗 Calendar Event ID: ${data.id}`;
              
              alert(successMessage);
              
              console.log("Calendar Event Created:", {
                  calendarEventId: data.id,
                  emailInfo: emailInfo,
                  calendarEventUrl: data.htmlLink
              });
              
              resetButton();
          } else {
              console.error("Calendar API error:", data);
              alert(`❌ Failed to create calendar event: ${JSON.stringify(data)}`);
              resetButton();
          }
      } catch (error) {
          console.error("Calendar creation error:", error);
          alert(`❌ Error creating calendar event: ${error.message}`);
          resetButton();
      }
  }
});







// document.addEventListener("DOMContentLoaded", () => {
//   const loginButton = document.getElementById('login');
//   const manualCheckButton = document.getElementById('manualCheck');
//   const statusDiv = document.getElementById('status');
//   const lastCheckSpan = document.getElementById('lastCheck');
//   const eventsCreatedSpan = document.getElementById('eventsCreated');
//   const autoStatusSpan = document.getElementById('autoStatus');
//   const notificationsCheckbox = document.getElementById('notifications');
//   const autoProcessCheckbox = document.getElementById('autoProcess');
  
//   // Load current status
//   loadStatus();
  
//   // Load settings
//   loadSettings();
  
//   loginButton.addEventListener('click', async () => {
//     loginButton.disabled = true;
//     loginButton.textContent = '🔄 Authorizing...';
    
//     try {
//       chrome.identity.getAuthToken({ interactive: true }, function (token) {
//         if (chrome.runtime.lastError || !token) {
//           showStatus('❌ Authorization failed. Please try again.', 'error');
//           resetLoginButton();
//           return;
//         }
        
//         // Test the token by making a simple API call
//         fetch('https://www.googleapis.com/gmail/v1/users/me/profile', {
//           headers: { Authorization: 'Bearer ' + token }
//         })
//         .then(response => response.json())
//         .then(data => {
//           if (data.emailAddress) {
//             showStatus(`✅ Successfully authorized: ${data.emailAddress}`, 'success');
//             autoStatusSpan.textContent = '✅ Active';
//             autoStatusSpan.className = 'value success';
//           } else {
//             showStatus('❌ Authorization test failed', 'error');
//           }
//           resetLoginButton();
//         })
//         .catch(error => {
//           console.error('Authorization test error:', error);
//           showStatus('❌ Authorization test failed', 'error');
//           resetLoginButton();
//         });
//       });
//     } catch (error) {
//       console.error('Login error:', error);
//       showStatus('❌ Login error', 'error');
//       resetLoginButton();
//     }
//   });
  
//   manualCheckButton.addEventListener('click', () => {
//     manualCheckButton.disabled = true;
//     manualCheckButton.textContent = '🔄 Checking...';
//     showStatus('🔍 Manually checking for new emails...', 'info');
    
//     // Send message to background script
//     chrome.runtime.sendMessage({ action: 'manualProcess' }, (response) => {
//       if (response && response.success) {
//         showStatus('✅ Manual check initiated', 'success');
//         // Refresh status after a delay
//         setTimeout(() => {
//           loadStatus();
//         }, 2000);
//       } else {
//         showStatus('❌ Failed to initiate manual check', 'error');
//       }
      
//       manualCheckButton.disabled = false;
//       manualCheckButton.textContent = '🔍 Check Now';
//     });
//   });
  
//   // Settings event listeners
//   notificationsCheckbox.addEventListener('change', () => {
//     chrome.storage.local.set({ 
//       notificationsEnabled: notificationsCheckbox.checked 
//     });
//   });
  
//   autoProcessCheckbox.addEventListener('change', () => {
//     chrome.storage.local.set({ 
//       autoProcessEnabled: autoProcessCheckbox.checked 
//     });
    
//     if (autoProcessCheckbox.checked) {
//       autoStatusSpan.textContent = '✅ Active';
//       autoStatusSpan.className = 'value success';
//     } else {
//       autoStatusSpan.textContent = '⏸️ Paused';
//       autoStatusSpan.className = 'value error';
//     }
//   });
  
//   function resetLoginButton() {
//     loginButton.disabled = false;
//     loginButton.textContent = '🔑 Authorize Gmail & Calendar';
//   }
  
//   function showStatus(message, type) {
//     statusDiv.textContent = message;
//     statusDiv.className = type;
//     statusDiv.style.display = 'block';
    
//     // Auto-hide after 5 seconds
//     setTimeout(() => {
//       statusDiv.style.display = 'none';
//     }, 5000);
//   }
  
//   function loadStatus() {
//     // Get status from background script
//     chrome.runtime.sendMessage({ action: 'getStats' }, (response) => {
//       if (response) {
//         if (response.lastProcessedTime > 0) {
//           const lastTime = new Date(response.lastProcessedTime);
//           lastCheckSpan.textContent = lastTime.toLocaleTimeString();
//         }
        
//         if (response.lastProcessedCount > 0) {
//           eventsCreatedSpan.textContent = response.lastProcessedCount;
//         }
//       }
//     });
    
//     // Check if user is authorized
//     chrome.identity.getAuthToken({ interactive: false }, function (token) {
//       if (token) {
//         autoStatusSpan.textContent = '✅ Active';
//         autoStatusSpan.className = 'value success';
//       } else {
//         autoStatusSpan.textContent = '❌ Need Authorization';
//         autoStatusSpan.className = 'value error';
//       }
//     });
//   }
  
//   function loadSettings() {
//     chrome.storage.local.get(['notificationsEnabled', 'autoProcessEnabled'], (result) => {
//       notificationsCheckbox.checked = result.notificationsEnabled !== false; // Default true
//       autoProcessCheckbox.checked = result.autoProcessEnabled !== false; // Default true
      
//       if (!autoProcessCheckbox.checked) {
//         autoStatusSpan.textContent = '⏸️ Paused by User';
//         autoStatusSpan.className = 'value error';
//       }
//     });
//   }
  
//   // Refresh status every 30 seconds
//   setInterval(loadStatus, 30000);
// });




