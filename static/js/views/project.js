'use strict'

const projModel = new Project();
const custModel = new Customer();

function initSelectTag(tagId, model) {
    let collection = model.Select();    
    let selectTag = document.getElementById(tagId);
    for(let i = 0; i < collection.length; ++i) {
        let optionTag = document.createElement('option');
        optionTag.setAttribute('value', collection[i].id);
        optionTag.innerText = collection[i].name;
        selectTag.appendChild(optionTag);
    }
}

function initAddForm() {
    initSelectTag('customer', custModel);

    const form = window.document.querySelector('#project-add-form')

    form.addEventListener('submit', function(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const projdata = {}
        formData.forEach((value, key) => {
            projdata[key] = value
        })

        projModel.Create(projdata)

        e.target.reset()
    })
}

function initList() {
    window.jQuery('#project-list').DataTable({
        data: projModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'Number', data: 'number' },
            { title: 'Description', data: 'description' },
            { title: 'Min experience', data: 'min_exec_exp' },
            { title: 'Customer', data: 'customer' },
            { title: 'Delete', data: '' }
        ],
        columnDefs: [
            {
                render: function(data, type, row) {
                    let customer = custModel.FindById(data);
                    return customer.name;
                },
                targets: 5
            },
            {
                render: function(data, type, row) {
                    return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
                },
                targets: 6
            }
        ]
    })
}

function initListEvents() {
    document.addEventListener('projectListDataChanged', function(e) {
        const dataTable = window.jQuery('#project-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    projModel.Delete(id);
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})
