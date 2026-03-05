function initTableScroll() {
    const tables = document.querySelectorAll('.wrapper .contain table');
    
    tables.forEach(table => {
        if (table.parentElement.classList.contains('table-scroll-wrapper')) {
            return;
        }
        
        const wrapper = document.createElement('div');
        wrapper.className = 'table-scroll-wrapper';
        wrapper.style.cssText = `
            display: block;
            overflow-x: auto;
            overflow-y: visible;
            max-width: 100%;
        `;
        
        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
    });
}