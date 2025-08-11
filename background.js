// // // // Required for manifest V3 service worker
// // // chrome.runtime.onInstalled.addListener(() => {
// // //     console.log("Email Scheduler Assistant installed.");
// // //   });
  




// // console.log("Background script started!");

// // const CHECK_INTERVAL = 1; // Check every minute
// // const PROCESSED_EMAILS_KEY = 'processedEmails';
// // const MAX_RETRIES = 3; // Max processing attempts
// // const RETRY_DELAY = 5000; // 5 seconds between retries
// // let isProcessing = false; // Processing lock

// // chrome.runtime.onInstalled.addListener(() => {
// //   console.log("Extension installed");
  
// //   // Initialize storage with empty processed emails list
// //   chrome.storage.local.set({ [PROCESSED_EMAILS_KEY]: [] }, () => {
// //     console.log("Storage initialized");
// //   });
  
// //   // Create recurring alarm
// //   chrome.alarms.create("email-check", {
// //     delayInMinutes: 0.1,
// //     periodInMinutes: CHECK_INTERVAL
// //   });
// // });

// // chrome.alarms.onAlarm.addListener((alarm) => {
// //   if (alarm.name === "email-check" && !isProcessing) {
// //     isProcessing = true;
// //     console.log("Starting email processing");
// //     checkEmails().finally(() => {
// //       isProcessing = false;
// //       console.log("Finished email processing");
// //     });
// //   }
// // });

// // async function checkEmails() {
// //   console.log("Checking for emails...");
  
// //   try {
// //     // Get Google OAuth token
// //     const token = await new Promise((resolve) => {
// //       chrome.identity.getAuthToken({ interactive: false }, (token) => {
// //         resolve(token);
// //       });
// //     });
    
// //     if (!token) {
// //       console.log("No Google login found");
// //       return;
// //     }
    
// //     // Get processed emails from storage
// //     const processedEmails = await new Promise(resolve => {
// //       chrome.storage.local.get([PROCESSED_EMAILS_KEY], result => {
// //         resolve(result[PROCESSED_EMAILS_KEY] || []);
// //       });
// //     });
    
// //     console.log(`Already processed ${processedEmails.length} emails`);
    
// //     // Fetch unread emails
// //     const emailResponse = await fetch(
// //       'https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread&maxResults=5',
// //       { headers: { Authorization: `Bearer ${token}` } }
// //     );
    
// //     const emailData = await emailResponse.json();
// //     const unreadEmails = emailData.messages || [];
// //     console.log(`Found ${unreadEmails.length} unread emails`);
    
// //     // Filter new emails
// //     const newEmails = unreadEmails.filter(email => !processedEmails.includes(email.id));
// //     console.log(`Found ${newEmails.length} new emails to process`);
    
// //     // Process each new email
// //     for (const email of newEmails) {
// //       // Immediately mark as processed in storage
// //       processedEmails.push(email.id);
// //       await markEmailProcessed(processedEmails);
// //       console.log(`Temporarily locked email ${email.id}`);
      
// //       try {
// //         // Process with retry logic
// //         const success = await processEmailWithRetry(email, token);
        
// //         if (success) {
// //           // Mark as read in Gmail after successful processing
// //           await markEmailAsRead(token, email.id);
// //           console.log(`Successfully processed email ${email.id}`);
// //         } else {
// //           console.error(`Failed to process email ${email.id} after ${MAX_RETRIES} attempts`);
// //           // Remove from processed list if failed
// //           const index = processedEmails.indexOf(email.id);
// //           if (index > -1) {
// //             processedEmails.splice(index, 1);
// //             await markEmailProcessed(processedEmails);
// //           }
// //         }
// //       } catch (error) {
// //         console.error(`Critical error processing email ${email.id}:`, error);
// //       }
// //     }
// //   } catch (error) {
// //     console.error("Global error in email check:", error);
// //   }
// // }

// // // Process single email with retry logic
// // async function processEmailWithRetry(email, token) {
// //   let attempt = 0;
  
// //   while (attempt < MAX_RETRIES) {
// //     attempt++;
// //     console.log(`Processing attempt ${attempt} for email ${email.id}`);
    
// //     try {
// //       // Fetch full email content
// //       const messageResponse = await fetch(
// //         `https://www.googleapis.com/gmail/v1/users/me/messages/${email.id}?format=full`,
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );
      
// //       const messageData = await messageResponse.json();
// //       const headers = messageData.payload.headers;
// //       const subject = headers.find(h => h.name === 'Subject')?.value || "No Subject";
      
// //       // Extract email body
// //       let body = "";
// //       if (messageData.payload.parts) {
// //         const textPart = messageData.payload.parts.find(p => p.mimeType === 'text/plain');
// //         if (textPart?.body?.data) {
// //           body = atob(textPart.body.data.replace(/-/g, '+').replace(/_/g, '/'));
// //         }
// //       } else if (messageData.payload.body?.data) {
// //         body = atob(messageData.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
// //       }
      
// //       // Extract event details
// //       const eventDetails = extractEventDetails(body);
      
// //       if (!eventDetails) {
// //         console.log("No event details found in email");
// //         return false;
// //       }
      
// //       // Check if event already exists
// //       const eventExists = await checkEventExists(token, subject, eventDetails.startTime);
// //       if (eventExists) {
// //         console.log("Event already exists in calendar");
// //         return true; // Considered successfully processed
// //       }
      
// //       // Create new event
// //       const created = await createCalendarEvent(token, subject, body, eventDetails);
      
// //       if (created) {
// //         return true; // Successfully processed
// //       }
// //     } catch (error) {
// //       console.error(`Attempt ${attempt} failed:`, error);
// //     }
    
// //     // Wait before retrying
// //     if (attempt < MAX_RETRIES) {
// //       await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
// //     }
// //   }
  
// //   return false; // All attempts failed
// // }

// // // Update processed emails in storage
// // async function markEmailProcessed(processedEmails) {
// //   await new Promise(resolve => {
// //     chrome.storage.local.set({ [PROCESSED_EMAILS_KEY]: processedEmails }, resolve);
// //   });
// // }

// // // Mark email as read in Gmail
// // async function markEmailAsRead(token, emailId) {
// //   try {
// //     await fetch(
// //       `https://www.googleapis.com/gmail/v1/users/me/messages/${emailId}/modify`,
// //       {
// //         method: 'POST',
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({
// //           removeLabelIds: ['UNREAD']
// //         })
// //       }
// //     );
// //     console.log(`Marked email ${emailId} as read`);
// //   } catch (error) {
// //     console.error("Failed to mark email as read:", error);
// //   }
// // }

// // // Check if event exists in calendar
// // async function checkEventExists(token, subject, startTime) {
// //   try {
// //     // Check 30 minutes before and after event time
// //     const timeMin = new Date(startTime.getTime() - 30*60000).toISOString();
// //     const timeMax = new Date(startTime.getTime() + 30*60000).toISOString();
    
// //     const response = await fetch(
// //       `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
// //       `q=${encodeURIComponent(subject)}&` +
// //       `timeMin=${timeMin}&timeMax=${timeMax}&` +
// //       `maxResults=1`,
// //       {
// //         headers: { Authorization: `Bearer ${token}` }
// //       }
// //     );

// //     const data = await response.json();
// //     return data.items && data.items.length > 0;
// //   } catch (error) {
// //     console.error("Event check failed:", error);
// //     return false;
// //   }
// // }

// // function extractEventDetails(body) {
// //   // Try multiple patterns
// //   const patterns = [
// //     // Pattern 1: "Date: Month DD, YYYY" and "Time: HH:MM AM/PM"
// //     {
// //       dateRegex: /Date:\s*([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/i,
// //       timeRegex: /Time:\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i
// //     },
// //     // Pattern 2: "DD Month YYYY at HH:MM AM/PM"
// //     {
// //       dateRegex: /(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})/i,
// //       timeRegex: /at\s+(\d{1,2}):(\d{2})\s*(AM|PM)/i
// //     },
// //     // Pattern 3: "Month DD, YYYY HH:MM AM/PM"
// //     {
// //       dateRegex: /([A-Za-z]+)\s+(\d{1,2}),\s*(\d{4})/i,
// //       timeRegex: /(\d{1,2}):(\d{2})\s*(AM|PM)/i
// //     }
// //   ];

// //   for (const pattern of patterns) {
// //     const dateMatch = body.match(pattern.dateRegex);
// //     const timeMatch = body.match(pattern.timeRegex);
    
// //     if (dateMatch && timeMatch) {
// //       console.log("Matched pattern with:", dateMatch, timeMatch);
// //       return parseDateTime(dateMatch, timeMatch);
// //     }
// //   }
  
// //   console.log("No date/time pattern matched");
// //   return null;
// // }

// // function parseDateTime(dateMatch, timeMatch) {
// //   const monthNames = ["January", "February", "March", "April", "May", "June", 
// //                      "July", "August", "September", "October", "November", "December"];
  
// //   // Extract date components
// //   let year, month, day;
  
// //   if (dateMatch[3] && dateMatch[3].length === 4) {
// //     // Pattern 1: "Date: July 30, 2025"
// //     year = parseInt(dateMatch[3]);
// //     month = monthNames.findIndex(m => m.toLowerCase() === dateMatch[1].toLowerCase());
// //     day = parseInt(dateMatch[2]);
// //   } else if (dateMatch[3] && dateMatch[3].length === 4) {
// //     // Pattern 2: "30 July 2025"
// //     year = parseInt(dateMatch[3]);
// //     month = monthNames.findIndex(m => m.toLowerCase() === dateMatch[2].toLowerCase());
// //     day = parseInt(dateMatch[1]);
// //   } else {
// //     // Pattern 3: "July 30, 2025"
// //     year = parseInt(dateMatch[3]);
// //     month = monthNames.findIndex(m => m.toLowerCase() === dateMatch[1].toLowerCase());
// //     day = parseInt(dateMatch[2]);
// //   }
  
// //   // Extract time components
// //   let hours = parseInt(timeMatch[1]);
// //   const minutes = parseInt(timeMatch[2]);
// //   const period = timeMatch[3].toUpperCase();
  
// //   // Convert to 24-hour format
// //   if (period === "PM" && hours < 12) hours += 12;
// //   if (period === "AM" && hours === 12) hours = 0;
  
// //   // Create Date object
// //   const eventDate = new Date(year, month, day, hours, minutes);
// //   console.log("Parsed date:", eventDate.toString());
  
// //   return {
// //     startTime: eventDate,
// //     endTime: new Date(eventDate.getTime() + 60 * 60 * 1000) // 1 hour duration
// //   };
// // }

// // async function createCalendarEvent(token, subject, body, eventDetails) {
// //   try {
// //     console.log("Creating event at:", eventDetails.startTime.toString());
    
// //     const response = await fetch(
// //       'https://www.googleapis.com/calendar/v3/calendars/primary/events',
// //       {
// //         method: 'POST',
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         },
// //         body: JSON.stringify({
// //           summary: subject,
// //           description: body.substring(0, 1000),
// //           start: {
// //             dateTime: eventDetails.startTime.toISOString(),
// //             timeZone: 'Asia/Kolkata'
// //           },
// //           end: {
// //             dateTime: eventDetails.endTime.toISOString(),
// //             timeZone: 'Asia/Kolkata'
// //           }
// //         })
// //       }
// //     );
    
// //     if (response.ok) {
// //       const eventData = await response.json();
// //       console.log("Event created:", eventData.htmlLink);
      
// //       // Show notification to user
// //       chrome.notifications.create({
// //         type: 'basic',
// //         iconUrl: 'icon128.png',
// //         title: 'Event Created',
// //         message: `Added "${subject}" to calendar`
// //       });
      
// //       return true;
// //     } else {
// //       const errorData = await response.json();
// //       console.error("Failed to create event:", errorData);
// //       return false;
// //     }
// //   } catch (error) {
// //     console.error("Event creation failed:", error);
// //     return false;
// //   }
// // }

// // // Keep service worker alive
// // setInterval(() => {
// //   console.log("Background heartbeat");
// // }, 30000);






// // ******************************







// console.log("Background script started!");

// const CHECK_INTERVAL = 1; // Check every minute
// const PROCESSED_EMAILS_KEY = 'processedEmails';
// const MAX_RETRIES = 3; // Max processing attempts
// const RETRY_DELAY = 5000; // 5 seconds between retries
// let isProcessing = false; // Processing lock

// chrome.runtime.onInstalled.addListener(() => {
//   console.log("Extension installed");
//   chrome.storage.local.set({ [PROCESSED_EMAILS_KEY]: [] }, () => {
//     console.log("Storage initialized");
//   });
//   chrome.alarms.create("email-check", {
//     delayInMinutes: 0.1,
//     periodInMinutes: CHECK_INTERVAL
//   });
// });

// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === "email-check" && !isProcessing) {
//     isProcessing = true;
//     console.log("Starting email processing");
//     checkEmails().finally(() => {
//       isProcessing = false;
//       console.log("Finished email processing");
//     });
//   }
// });

// async function checkEmails() {
//   console.log("Checking for emails...");
  
//   try {
//     const token = await new Promise((resolve) => {
//       chrome.identity.getAuthToken({ interactive: false }, (token) => {
//         resolve(token);
//       });
//     });
    
//     if (!token) {
//       console.log("No Google login found");
//       return;
//     }
    
//     const processedEmails = await new Promise(resolve => {
//       chrome.storage.local.get([PROCESSED_EMAILS_KEY], result => {
//         resolve(result[PROCESSED_EMAILS_KEY] || []);
//       });
//     });
    
//     console.log(`Already processed ${processedEmails.length} emails`);
    
//     const emailResponse = await fetch(
//       'https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread&maxResults=5',
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
    
//     const emailData = await emailResponse.json();
//     const unreadEmails = emailData.messages || [];
//     console.log(`Found ${unreadEmails.length} unread emails`);
    
//     const newEmails = unreadEmails.filter(email => !processedEmails.includes(email.id));
//     console.log(`Found ${newEmails.length} new emails to process`);
    
//     for (const email of newEmails) {
//       processedEmails.push(email.id);
//       await markEmailProcessed(processedEmails);
//       console.log(`Temporarily locked email ${email.id}`);
      
//       try {
//         const success = await processEmailWithRetry(email, token);
        
//         if (success) {
//           await markEmailAsRead(token, email.id);
//           console.log(`Successfully processed email ${email.id}`);
//         } else {
//           console.error(`Failed to process email ${email.id} after ${MAX_RETRIES} attempts`);
//           const index = processedEmails.indexOf(email.id);
//           if (index > -1) {
//             processedEmails.splice(index, 1);
//             await markEmailProcessed(processedEmails);
//           }
//         }
//       } catch (error) {
//         console.error(`Critical error processing email ${email.id}:`, error);
//       }
//     }
//   } catch (error) {
//     console.error("Global error in email check:", error);
//   }
// }

// async function processEmailWithRetry(email, token) {
//   let attempt = 0;
//   let success = false;
  
//   while (attempt < MAX_RETRIES && !success) {
//     attempt++;
//     console.log(`Processing attempt ${attempt} for email ${email.id}`);
    
//     try {
//       const messageResponse = await fetch(
//         `https://www.googleapis.com/gmail/v1/users/me/messages/${email.id}?format=full`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       const messageData = await messageResponse.json();
//       const headers = messageData.payload.headers;
//       const subject = headers.find(h => h.name === 'Subject')?.value || "No Subject";
      
//       let body = "";
//       if (messageData.payload.parts) {
//         const textPart = messageData.payload.parts.find(p => p.mimeType === 'text/plain');
//         if (textPart?.body?.data) {
//           body = atob(textPart.body.data.replace(/-/g, '+').replace(/_/g, '/'));
//         }
//       } else if (messageData.payload.body?.data) {
//         body = atob(messageData.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
//       }
      
//       // Extract ALL event details from email
//       const events = extractAllEvents(body, subject);
//       console.log(`Found ${events.length} events in email`);
      
//       if (events.length === 0) {
//         console.log("No event details found in email");
//         return false;
//       }
      
//       // Process each found event
//       for (const event of events) {
//         // Check for existing event
//         const eventExists = await checkEventExists(token, event.title, event.startTime);
//         if (eventExists) {
//           console.log("Event already exists in calendar:", event.title);
//           continue;
//         }
        
//         // Create new event
//         const created = await createCalendarEvent(token, event);
//         if (created) {
//           success = true; // Mark at least one event was created
//           console.log(`Created event: ${event.title}`);
//         }
//       }
      
//       // If we created at least one event, consider it successful
//       if (success) return true;
      
//     } catch (error) {
//       console.error(`Attempt ${attempt} failed:`, error);
//     }
    
//     // Wait before retrying
//     if (attempt < MAX_RETRIES) {
//       await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
//     }
//   }
  
//   return false;
// }

// // Enhanced event extraction to handle different scenarios
// function extractAllEvents(body, subject) {
//   const events = [];
  
//   // 1. Extract all dates with times (for deadlines)
//   const deadlinePattern = /(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{4}),?\s*(\d{1,2}):(\d{2})\s*(AM|PM)/gi;
//   const deadlineMatches = [];
//   let deadlineMatch;
  
//   while ((deadlineMatch = deadlinePattern.exec(body)) !== null) {
//     deadlineMatches.push(deadlineMatch);
//   }
  
//   // Process each deadline match
//   for (const match of deadlineMatches) {
//     const [_, day, month, year, hours, minutes, period] = match;
//     const eventDate = parseDate(day, month, year, hours, minutes, period);
    
//     events.push({
//       title: `${subject} - Deadline`,
//       startTime: eventDate,
//       endTime: new Date(eventDate.getTime() + 30 * 60 * 1000), // 30 min duration
//       description: "Important deadline for placement activity"
//     });
//   }
  
//   // 2. Extract all dates without times (potential event dates)
//   const datePattern = /(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{4})/gi;
//   const dateMatches = [];
//   let dateMatch;
  
//   while ((dateMatch = datePattern.exec(body)) !== null) {
//     dateMatches.push(dateMatch);
//   }
  
//   // Filter out dates that are already used in deadlines
//   const uniqueDates = dateMatches.filter(match => {
//     const [_, day, month, year] = match;
//     const dateStr = `${day}.${month}.${year}`;
//     return !deadlineMatches.some(d => d[1] === day && d[2] === month && d[3] === year);
//   });
  
//   // Process unique dates (use the last one found as main event)
//   if (uniqueDates.length > 0) {
//     const lastMatch = uniqueDates[uniqueDates.length - 1];
//     const [_, day, month, year] = lastMatch;
//     const eventDate = parseDate(day, month, year, 9, 0, 'AM'); // Default to 9 AM
    
//     events.push({
//       title: subject,
//       startTime: eventDate,
//       endTime: new Date(eventDate.getTime() + 8 * 60 * 60 * 1000), // 8 hours duration
//       description: "Placement drive event"
//     });
//   }
  
//   // 3. Check for date references in subject
//   const subjectDateMatch = subject.match(/(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{4})/);
//   if (subjectDateMatch) {
//     const [_, day, month, year] = subjectDateMatch;
//     const eventDate = parseDate(day, month, year, 9, 0, 'AM');
    
//     // Only add if not already in events
//     const exists = events.some(e => 
//       e.startTime.getDate() === eventDate.getDate() &&
//       e.startTime.getMonth() === eventDate.getMonth() &&
//       e.startTime.getFullYear() === eventDate.getFullYear()
//     );
    
//     if (!exists) {
//       events.push({
//         title: subject,
//         startTime: eventDate,
//         endTime: new Date(eventDate.getTime() + 8 * 60 * 60 * 1000),
//         description: "Placement drive event (from subject)"
//       });
//     }
//   }
  
//   return events;
// }

// // More robust date parsing
// function parseDate(day, month, year, hours, minutes, period) {
//   day = parseInt(day);
//   month = parseInt(month) - 1; // JS months are 0-indexed
//   year = parseInt(year);
  
//   let hourInt = parseInt(hours);
//   const minInt = parseInt(minutes);
  
//   // Handle 12-hour format
//   if (period) {
//     const upperPeriod = period.toUpperCase();
//     if (upperPeriod === 'PM' && hourInt < 12) hourInt += 12;
//     if (upperPeriod === 'AM' && hourInt === 12) hourInt = 0;
//   }
  
//   return new Date(year, month, day, hourInt, minInt);
// }

// // Update processed emails in storage
// async function markEmailProcessed(processedEmails) {
//   await new Promise(resolve => {
//     chrome.storage.local.set({ [PROCESSED_EMAILS_KEY]: processedEmails }, resolve);
//   });
// }

// // Mark email as read in Gmail
// async function markEmailAsRead(token, emailId) {
//   try {
//     await fetch(
//       `https://www.googleapis.com/gmail/v1/users/me/messages/${emailId}/modify`,
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           removeLabelIds: ['UNREAD']
//         })
//       }
//     );
//     console.log(`Marked email ${emailId} as read`);
//   } catch (error) {
//     console.error("Failed to mark email as read:", error);
//   }
// }

// // Check if event exists
// async function checkEventExists(token, title, startTime) {
//   try {
//     const timeMin = new Date(startTime.getTime() - 30 * 60000).toISOString();
//     const timeMax = new Date(startTime.getTime() + 30 * 60000).toISOString();
    
//     const response = await fetch(
//       `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
//       `q=${encodeURIComponent(title)}&` +
//       `timeMin=${timeMin}&timeMax=${timeMax}&` +
//       `maxResults=1`,
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     const data = await response.json();
//     return data.items && data.items.length > 0;
//   } catch (error) {
//     console.error("Event check failed:", error);
//     return false;
//   }
// }

// // Create calendar event
// async function createCalendarEvent(token, event) {
//   try {
//     console.log(`Creating event: ${event.title} at ${event.startTime}`);
    
//     const response = await fetch(
//       'https://www.googleapis.com/calendar/v3/calendars/primary/events',
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           summary: event.title,
//           description: event.description,
//           start: {
//             dateTime: event.startTime.toISOString(),
//             timeZone: 'Asia/Kolkata'
//           },
//           end: {
//             dateTime: event.endTime.toISOString(),
//             timeZone: 'Asia/Kolkata'
//           }
//         })
//       }
//     );
    
//     if (response.ok) {
//       const eventData = await response.json();
//       console.log("Event created:", eventData.htmlLink);
      
//       chrome.notifications.create({
//         type: 'basic',
//         iconUrl: 'icon128.png',
//         title: 'Event Created',
//         message: `Added "${event.title}" to calendar`
//       });
      
//       return true;
//     } else {
//       const errorData = await response.json();
//       console.error("Failed to create event:", errorData);
//       return false;
//     }
//   } catch (error) {
//     console.error("Event creation failed:", error);
//     return false;
//   }
// }

// // Keep service worker alive
// setInterval(() => {
//   console.log("Background heartbeat");
// }, 30000);




//**************************************** */






console.log("Background script started!");

const CHECK_INTERVAL = 1; // Check every minute
const PROCESSED_EMAILS_KEY = 'processedEmails';
const MAX_RETRIES = 3; // Max processing attempts
const RETRY_DELAY = 5000; // 5 seconds between retries
let isProcessing = false; // Processing lock

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
  chrome.storage.local.set({ [PROCESSED_EMAILS_KEY]: [] }, () => {
    console.log("Storage initialized");
  });
  chrome.alarms.create("email-check", {
    delayInMinutes: 0.1,
    periodInMinutes: CHECK_INTERVAL
  });
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "email-check" && !isProcessing) {
    isProcessing = true;
    console.log("Starting email processing");
    checkEmails().finally(() => {
      isProcessing = false;
      console.log("Finished email processing");
    });
  }
});

async function checkEmails() {
  console.log("Checking for emails...");
  
  try {
    const token = await new Promise((resolve) => {
      chrome.identity.getAuthToken({ interactive: false }, (token) => {
        resolve(token);
      });
    });
    
    if (!token) {
      console.log("No Google login found");
      return;
    }
    
    const processedEmails = await new Promise(resolve => {
      chrome.storage.local.get([PROCESSED_EMAILS_KEY], result => {
        resolve(result[PROCESSED_EMAILS_KEY] || []);
      });
    });
    
    console.log(`Already processed ${processedEmails.length} emails`);
    
    const emailResponse = await fetch(
      'https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread&maxResults=5',
      { headers: { Authorization: `Bearer ${token}` } }
    );
    
    const emailData = await emailResponse.json();
    const unreadEmails = emailData.messages || [];
    console.log(`Found ${unreadEmails.length} unread emails`);
    
    const newEmails = unreadEmails.filter(email => !processedEmails.includes(email.id));
    console.log(`Found ${newEmails.length} new emails to process`);
    
    for (const email of newEmails) {
      processedEmails.push(email.id);
      await markEmailProcessed(processedEmails);
      console.log(`Temporarily locked email ${email.id}`);
      
      try {
        const success = await processEmailWithRetry(email, token);
        
        if (success) {
          await markEmailAsRead(token, email.id);
          console.log(`Successfully processed email ${email.id}`);
        } else {
          console.error(`Failed to process email ${email.id} after ${MAX_RETRIES} attempts`);
          const index = processedEmails.indexOf(email.id);
          if (index > -1) {
            processedEmails.splice(index, 1);
            await markEmailProcessed(processedEmails);
          }
        }
      } catch (error) {
        console.error(`Critical error processing email ${email.id}:`, error);
      }
    }
  } catch (error) {
    console.error("Global error in email check:", error);
  }
}

async function processEmailWithRetry(email, token) {
  let attempt = 0;
  let success = false;
  
  while (attempt < MAX_RETRIES && !success) {
    attempt++;
    console.log(`Processing attempt ${attempt} for email ${email.id}`);
    
    try {
      const messageResponse = await fetch(
        `https://www.googleapis.com/gmail/v1/users/me/messages/${email.id}?format=full`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      const messageData = await messageResponse.json();
      const headers = messageData.payload.headers;
      const subject = headers.find(h => h.name === 'Subject')?.value || "No Subject";
      
      let body = "";
      if (messageData.payload.parts) {
        const textPart = messageData.payload.parts.find(p => p.mimeType === 'text/plain');
        if (textPart?.body?.data) {
          body = atob(textPart.body.data.replace(/-/g, '+').replace(/_/g, '/'));
        }
      } else if (messageData.payload.body?.data) {
        body = atob(messageData.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
      }
      
      // Extract ALL event details from email
      const events = extractAllEvents(body, subject);
      console.log(`Found ${events.length} events in email`);
      
      if (events.length === 0) {
        console.log("No event details found in email");
        return false;
      }
      
      // Process each found event
      for (const event of events) {
        // Check for existing event
        const eventExists = await checkEventExists(token, event.title, event.startTime);
        if (eventExists) {
          console.log("Event already exists in calendar:", event.title);
          continue;
        }
        
        // Create new event
        const created = await createCalendarEvent(token, event);
        if (created) {
          success = true; // Mark at least one event was created
          console.log(`Created event: ${event.title}`);
        }
      }
      
      // If we created at least one event, consider it successful
      if (success) return true;
      
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
    }
    
    // Wait before retrying
    if (attempt < MAX_RETRIES) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    }
  }
  
  return false;
}

// Universal event extraction to handle ALL different email formats
function extractAllEvents(body, subject) {
  const events = [];
  const combinedText = `${subject} ${body}`.toLowerCase();
  
  // 1. FORMAL DATE FORMATS with specific times
  const formalPatterns = [
    // 17.07.2025, 08:00 AM | 17/07/2025, 08:00 AM
    /(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{4}),?\s*(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)/gi,
    // 17.07.2025 08:00 AM (no comma)
    /(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{4})\s+(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)/gi,
    // 17-07-2025, 08:00 AM (dash format)
    /(\d{1,2})-(\d{1,2})-(\d{4}),?\s*(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)/gi
  ];
  
  for (const pattern of formalPatterns) {
    let match;
    while ((match = pattern.exec(combinedText)) !== null) {
      const [, day, month, year, hours, minutes, period] = match;
      const eventDate = parseDate(day, month, year, hours, minutes, period);
      
      events.push({
        title: `${subject} - Deadline`,
        startTime: eventDate,
        endTime: new Date(eventDate.getTime() + 30 * 60 * 1000),
        description: "Important deadline for placement activity",
        type: 'deadline'
      });
    }
  }
  
  // 2. CASUAL DATE FORMATS with times
  const casualTimePatterns = [
    // "at 6:45pm on 28 july" | "at 6:45 pm on 28 july"
    /(?:at\s*)?(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?\s*on\s*(\d{1,2})(?:st|nd|rd|th)?\s*(january|february|march|april|may|june|july|august|september|october|november|december)/gi,
    // "on 28 july at 6:45pm" | "on 28 july at 6:45 pm"
    /on\s*(\d{1,2})(?:st|nd|rd|th)?\s*(january|february|march|april|may|june|july|august|september|october|november|december)\s*(?:at\s*)?(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?/gi,
    // "28 july 6:45pm" | "28 july 6:45 pm"
    /(\d{1,2})(?:st|nd|rd|th)?\s*(january|february|march|april|may|june|july|august|september|october|november|december)\s*(?:at\s*)?(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?/gi,
    // "july 28 at 6:45pm" | "july 28th at 6:45 pm"
    /(january|february|march|april|may|june|july|august|september|october|november|december)\s*(\d{1,2})(?:st|nd|rd|th)?\s*(?:at\s*)?(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)?/gi
  ];
  
  for (const pattern of casualTimePatterns) {
    let match;
    while ((match = pattern.exec(combinedText)) !== null) {
      let day, month, hours, minutes, period;
      
      // Handle different capture group orders based on pattern
      if (pattern.source.includes('on\\s*')) {
        // Pattern: at 6:45pm on 28 july
        [, hours, minutes, period, day, month] = match;
      } else if (pattern.source.startsWith('on\\s*')) {
        // Pattern: on 28 july at 6:45pm
        [, day, month, hours, minutes, period] = match;
      } else if (pattern.source.startsWith('\\(\\d')) {
        // Pattern: 28 july 6:45pm
        [, day, month, hours, minutes, period] = match;
      } else {
        // Pattern: july 28 at 6:45pm
        [, month, day, hours, minutes, period] = match;
      }
      
      const monthNumber = getMonthNumber(month);
      const currentYear = new Date().getFullYear();
      const eventDate = parseDate(day, monthNumber, currentYear, hours, minutes, period || 'PM');
      
      events.push({
        title: `${subject} - Meeting/Interview`,
        startTime: eventDate,
        endTime: new Date(eventDate.getTime() + 60 * 60 * 1000),
        description: "Meeting/Interview scheduled from email",
        type: 'meeting'
      });
    }
  }
  
  // 3. DATE-ONLY FORMATS (no specific time)
  const dateOnlyPatterns = [
    // "on 28 july" | "on 28th july"
    /on\s*(\d{1,2})(?:st|nd|rd|th)?\s*(january|february|march|april|may|june|july|august|september|october|november|december)/gi,
    // "july 28" | "july 28th"
    /(january|february|march|april|may|june|july|august|september|october|november|december)\s*(\d{1,2})(?:st|nd|rd|th)?/gi,
    // "28 july" | "28th july"
    /(\d{1,2})(?:st|nd|rd|th)?\s*(january|february|march|april|may|june|july|august|september|october|november|december)/gi,
    // Traditional formats: 17.07.2025 | 17/07/2025 | 17-07-2025
    /(\d{1,2})[\.\/\-](\d{1,2})[\.\/\-](\d{4})/gi,
    // Short year: 17.07.25 | 17/07/25
    /(\d{1,2})[\.\/\-](\d{1,2})[\.\/\-](\d{2})/gi
  ];
  
  for (const pattern of dateOnlyPatterns) {
    let match;
    while ((match = pattern.exec(combinedText)) !== null) {
      let day, month, year;
      
      // Skip if we already have a timed event for this text
      const hasTimedEvent = events.some(e => e.type === 'meeting' || e.type === 'deadline');
      
      if (match[1] && match[2] && match[3]) {
        if (isNaN(match[2])) {
          // Pattern: july 28 or 28 july
          if (isNaN(match[1])) {
            // july 28
            month = getMonthNumber(match[1]);
            day = match[2];
          } else {
            // 28 july
            day = match[1];
            month = getMonthNumber(match[2]);
          }
          year = new Date().getFullYear();
        } else {
          // Numeric date format
          day = match[1];
          month = match[2];
          year = match[3];
          
          // Handle 2-digit years
          if (year.length === 2) {
            year = parseInt(year) > 50 ? `19${year}` : `20${year}`;
          }
        }
      } else {
        // Handle 2-part matches (month day without year)
        if (isNaN(match[1])) {
          // july 28
          month = getMonthNumber(match[1]);
          day = match[2];
        } else {
          // 28 july
          day = match[1];
          month = getMonthNumber(match[2]);
        }
        year = new Date().getFullYear();
      }
      
      // Check if we already have an event for this date
      const eventDate = parseDate(day, month, year, 9, 0, 'AM');
      const dateExists = events.some(e => 
        e.startTime.getDate() === eventDate.getDate() &&
        e.startTime.getMonth() === eventDate.getMonth() &&
        e.startTime.getFullYear() === eventDate.getFullYear()
      );
      
      if (!dateExists) {
        events.push({
          title: subject,
          startTime: eventDate,
          endTime: new Date(eventDate.getTime() + 8 * 60 * 60 * 1000),
          description: "Event scheduled from email",
          type: 'event'
        });
      }
    }
  }
  
  // 4. TIME-ONLY FORMATS (assume today or tomorrow)
  const timeOnlyPatterns = [
    // "at 6:45pm" | "at 6:45 pm" | "6:45pm" | "6:45 pm"
    /(?:at\s*)?(\d{1,2}):(\d{2})\s*(AM|PM|am|pm)/gi,
    // "at 6pm" | "6pm"
    /(?:at\s*)?(\d{1,2})\s*(AM|PM|am|pm)/gi
  ];
  
  // Only process time-only if no date was found
  if (events.length === 0) {
    for (const pattern of timeOnlyPatterns) {
      let match;
      while ((match = pattern.exec(combinedText)) !== null) {
        const [, hours, minutes, period] = match;
        const today = new Date();
        const eventDate = parseDate(today.getDate(), today.getMonth() + 1, today.getFullYear(), hours, minutes || '00', period);
        
        // If time has passed today, schedule for tomorrow
        if (eventDate < new Date()) {
          eventDate.setDate(eventDate.getDate() + 1);
        }
        
        events.push({
          title: `${subject} - Urgent`,
          startTime: eventDate,
          endTime: new Date(eventDate.getTime() + 60 * 60 * 1000),
          description: "Time-specific event (assumed today/tomorrow)",
          type: 'urgent'
        });
      }
    }
  }
  
  // 5. RELATIVE DATE FORMATS
  const relativeDatePatterns = [
    // "tomorrow at 6pm" | "tomorrow 6pm"
    /tomorrow\s*(?:at\s*)?(\d{1,2}):?(\d{2})?\s*(AM|PM|am|pm)?/gi,
    // "next monday" | "this friday"
    /(next|this)\s*(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/gi,
    // "in 2 days" | "after 3 days"
    /(?:in|after)\s*(\d+)\s*days?/gi
  ];
  
  for (const pattern of relativeDatePatterns) {
    let match;
    while ((match = pattern.exec(combinedText)) !== null) {
      let eventDate = new Date();
      
      if (match[0].includes('tomorrow')) {
        eventDate.setDate(eventDate.getDate() + 1);
        if (match[1]) {
          const hours = match[1];
          const minutes = match[2] || '00';
          const period = match[3] || 'PM';
          eventDate = parseDate(eventDate.getDate(), eventDate.getMonth() + 1, eventDate.getFullYear(), hours, minutes, period);
        } else {
          eventDate.setHours(9, 0, 0, 0);
        }
      } else if (match[1] === 'next' || match[1] === 'this') {
        const dayName = match[2].toLowerCase();
        const targetDay = getDayOfWeek(dayName);
        const today = eventDate.getDay();
        let daysToAdd = targetDay - today;
        
        if (match[1] === 'next' || daysToAdd <= 0) {
          daysToAdd += 7;
        }
        
        eventDate.setDate(eventDate.getDate() + daysToAdd);
        eventDate.setHours(9, 0, 0, 0);
      } else if (match[1]) {
        // "in X days"
        const daysToAdd = parseInt(match[1]);
        eventDate.setDate(eventDate.getDate() + daysToAdd);
        eventDate.setHours(9, 0, 0, 0);
      }
      
      events.push({
        title: subject,
        startTime: eventDate,
        endTime: new Date(eventDate.getTime() + 2 * 60 * 60 * 1000),
        description: "Relative date event from email",
        type: 'relative'
      });
    }
  }
  
  return events;
}

// Enhanced helper functions
function getMonthNumber(monthName) {
  const months = {
    'january': 1, 'jan': 1, 'february': 2, 'feb': 2, 'march': 3, 'mar': 3,
    'april': 4, 'apr': 4, 'may': 5, 'june': 6, 'jun': 6,
    'july': 7, 'jul': 7, 'august': 8, 'aug': 8, 'september': 9, 'sep': 9, 'sept': 9,
    'october': 10, 'oct': 10, 'november': 11, 'nov': 11, 'december': 12, 'dec': 12
  };
  
  return months[monthName.toLowerCase()] || 1;
}

function getDayOfWeek(dayName) {
  const days = {
    'sunday': 0, 'monday': 1, 'tuesday': 2, 'wednesday': 3,
    'thursday': 4, 'friday': 5, 'saturday': 6
  };
  
  return days[dayName.toLowerCase()] || 1;
}

// Enhanced date parsing with better error handling
function parseDate(day, month, year, hours, minutes, period) {
  day = parseInt(day);
  month = parseInt(month);
  year = parseInt(year);
  
  // Handle month as string (for mixed formats)
  if (isNaN(month)) {
    month = getMonthNumber(month);
  } else {
    month = month - 1; // JS months are 0-indexed only for numeric months
  }
  
  let hourInt = parseInt(hours);
  const minInt = parseInt(minutes);
  
  // Handle 12-hour format
  if (period) {
    const upperPeriod = period.toUpperCase();
    if (upperPeriod === 'PM' && hourInt < 12) hourInt += 12;
    if (upperPeriod === 'AM' && hourInt === 12) hourInt = 0;
  }
  
  const date = new Date(year, month, day, hourInt, minInt);
  
  // Validate date
  if (isNaN(date.getTime())) {
    console.warn(`Invalid date created: ${day}/${month+1}/${year} ${hourInt}:${minInt}`);
    return new Date(); // Return current date as fallback
  }
  
  return date;
}

// Update processed emails in storage
async function markEmailProcessed(processedEmails) {
  await new Promise(resolve => {
    chrome.storage.local.set({ [PROCESSED_EMAILS_KEY]: processedEmails }, resolve);
  });
}

// Mark email as read in Gmail
async function markEmailAsRead(token, emailId) {
  try {
    await fetch(
      `https://www.googleapis.com/gmail/v1/users/me/messages/${emailId}/modify`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          removeLabelIds: ['UNREAD']
        })
      }
    );
    console.log(`Marked email ${emailId} as read`);
  } catch (error) {
    console.error("Failed to mark email as read:", error);
  }
}

// Check if event exists
async function checkEventExists(token, title, startTime) {
  try {
    const timeMin = new Date(startTime.getTime() - 30 * 60000).toISOString();
    const timeMax = new Date(startTime.getTime() + 30 * 60000).toISOString();
    
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?` +
      `q=${encodeURIComponent(title)}&` +
      `timeMin=${timeMin}&timeMax=${timeMax}&` +
      `maxResults=1`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const data = await response.json();
    return data.items && data.items.length > 0;
  } catch (error) {
    console.error("Event check failed:", error);
    return false;
  }
}

// Create calendar event
async function createCalendarEvent(token, event) {
  try {
    console.log(`Creating event: ${event.title} at ${event.startTime}`);
    
    const response = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          summary: event.title,
          description: event.description,
          start: {
            dateTime: event.startTime.toISOString(),
            timeZone: 'Asia/Kolkata'
          },
          end: {
            dateTime: event.endTime.toISOString(),
            timeZone: 'Asia/Kolkata'
          }
        })
      }
    );
    
    if (response.ok) {
      const eventData = await response.json();
      console.log("Event created:", eventData.htmlLink);
      
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icon128.png',
        title: 'Event Created',
        message: `Added "${event.title}" to calendar`
      });
      
      return true;
    } else {
      const errorData = await response.json();
      console.error("Failed to create event:", errorData);
      return false;
    }
  } catch (error) {
    console.error("Event creation failed:", error);
    return false;
  }
}

// Keep service worker alive
setInterval(() => {
  console.log("Background heartbeat");
}, 30000);