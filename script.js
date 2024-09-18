    const itemForm = document.getElementById('itemForm');
    const itemNameInput = document.getElementById('itemName');
    const itemTableBody = document.getElementById('itemTableBody');
    const formError = document.getElementById('formError');
    
    let items = JSON.parse(localStorage.getItem('items')) || [];  // Load from LocalStorage
    let editIndex = -1;
  
    // Function to render the item list
    function renderItems() {
      itemTableBody.innerHTML = '';
      items.forEach((item, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
          <td>${item}</td>
          <td>
            <button class="btn btn-sm btn-warning" onclick="editItem(${index})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="deleteItem(${index})">Delete</button>
          </td>
        `;
  
        itemTableBody.appendChild(row);
      });
    }
  
    // Function to save items to LocalStorage
    function saveToLocalStorage() {
      localStorage.setItem('items', JSON.stringify(items));
    }
  
    // Add or update item
    itemForm.addEventListener('submit', (e) => {
      e.preventDefault(); // prevent from page refreshing upon submission 
      const itemName = itemNameInput.value.trim();  // remove white spaces start and end 
  
      if (!itemName) {
        formError.textContent = "Item name cannot be empty.";
        return;
      }
  
      formError.textContent = "";
  
      if (editIndex === -1) {
        // Add new item
        items.push(itemName);
      } else {
        // Update existing item
        items[editIndex] = itemName;
        editIndex = -1;
      }
  
      itemNameInput.value = '';
      saveToLocalStorage();  // Save to LocalStorage after adding/updating
      renderItems();
    });
  
    // Edit item
    const editItem = (index) => {
      itemNameInput.value = items[index];
      editIndex = index;
    };
  
    // Delete item
    const deleteItem = (index) => {
      items.splice(index, 1);
      saveToLocalStorage();  // Save to LocalStorage after deletion
      renderItems();
    };
  
    // Render the list on page load
    renderItems();
  