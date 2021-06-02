'use strict'

const custModel = new Customer()

function initAddForm() {
    const form = window.document.querySelector('#customer-add-form')
    form.addEventListener('submit', function(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const custData = {}
        formData.forEach((value, key) => {
            custData[key] = value

        })

        custModel.Create(custData)

        e.target.reset()
    })
}

function initList() {
    window.jQuery('#customer-list').DataTable({
        data: custModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'Code', data: 'code' },
            { title: 'Budget', data: 'budget' },
            { title: 'Delete', data: '' }
        ],
        columnDefs: [{
            "render": function(data, type, row) {
                return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
            },
            "targets": 5
        }]
    })
}

function initListEvents() {
    document.addEventListener('customersListDataChanged', function(e) {
        const dataTable = window.jQuery('#customer-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    custModel.Delete(id);
    row.remove();
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})

