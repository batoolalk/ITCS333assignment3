// This function fetches data from the Bahrain Open Data Portal API
async function fetchData() {
    const url = 'https://data.gov.bh/api/explore/v2.1/catalog/datasets/01-statistics-of-students-nationalities_updated/records?where=colleges%20like%20%22IT%22%20AND%20the_programs%20like%20%22bachelor%22&limit=100';
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the response as JSON
      const data = await response.json();  
      console.log("API Data:", data);  // Log the full response to check the structure
  
      // Check if the data is correctly structured
      if (!data.records || data.records.length === 0) {
        console.log("No records found.");
        displayNoDataMessage();
        return;
      }
  
      // Log the first record to inspect its fields
      console.log("First Record:", data.records[0].fields); 
  
      // Filter data to display all records where the colleges field contains "College of IT"
      const filteredData = data.records.filter(record => {
        // Log the full fields for each record to inspect their values
        console.log("Checking Record Fields:", record.fields);
  
        // Check if 'colleges' contains the exact text 'College of IT' (case-sensitive match)
        return record.fields.colleges && record.fields.colleges.includes('College of IT');  
      });
  
      // Log filtered data
      console.log("Filtered Data:", filteredData);
  
      // If filtered data is available, display it; otherwise, show "No data available"
      if (filteredData.length > 0) {
        displayData(filteredData);  // Pass the filtered data to the display function
      } else {
        console.log("No data available for 'College of IT'.");
        displayNoDataMessage();  // Custom function to show a message if no data
      }
  
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
  
  // Function to display data in the table
  function displayData(records) {
    const table = document.getElementById('student-table');
    table.innerHTML = '';  // Clear previous data
  
    // Create table headers
    const headerRow = document.createElement('tr');
    const headers = ['Year', 'Semester', 'The Programs', 'Nationality', 'Colleges'];
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
  
    // Add rows for each record
    records.forEach(record => {
      const row = document.createElement('tr');
  
      // Access the necessary fields from the API response
      const yearCell = document.createElement('td');
      yearCell.textContent = record.fields.year || 'N/A';  // Example: Accessing year
      row.appendChild(yearCell);
  
      const semesterCell = document.createElement('td');
      semesterCell.textContent = record.fields.semester || 'N/A';  // Example: Accessing semester
      row.appendChild(semesterCell);
  
      const programsCell = document.createElement('td');
      programsCell.textContent = record.fields.the_programs || 'N/A';  // Example: Accessing programs
      row.appendChild(programsCell);
  
      const nationalityCell = document.createElement('td');
      nationalityCell.textContent = record.fields.nationality || 'N/A';  // Example: Accessing nationality
      row.appendChild(nationalityCell);
  
      const collegesCell = document.createElement('td');
      collegesCell.textContent = record.fields.colleges || 'N/A';  // Example: Accessing colleges
      row.appendChild(collegesCell);
  
      table.appendChild(row);
    });
  }
  
  // Optional function to handle cases where there is no data
  function displayNoDataMessage() {
    const table = document.getElementById('student-table');
    table.innerHTML = '<tr><td colspan="5">No data available for "College of IT".</td></tr>';
  }
  
  // Call fetchData when the page loads
  window.onload = fetchData;
  
