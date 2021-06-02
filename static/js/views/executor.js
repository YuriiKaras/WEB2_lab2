'use strict'

const execModel = new Executor();

function initAddForm () {
    const form = window.document.querySelector('#executor-add-form')
    form.addEventListener('submit', function (e) {
        e.preventDefault()
  
        const formData = new FormData(e.target)
        const execdata = {}
        formData.forEach((value, key) => {
            execdata[key] = value
        })
  
        execModel.Create(execdata)
  
        e.target.reset()
    })
}
  
function initList () {
    window.jQuery('#executor-list').DataTable({
        data: execModel.Select(),
        columns: [
            { title: 'Name', data: 'name' },
            { title: 'Code', data: 'code' },
            { title: 'Experience', data: 'experience' },
            { title: 'Workers', data: 'workers_ammount' },
            { title: 'Delete', data: '' }
        ],
        columnDefs: [{
            "render": function(data, type, row) {
                return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
            },
            "targets": 4
        }]
    })
}
  
function initListEvents () {
    document.addEventListener('executorsListDataChanged', function (e) {
        const dataTable = window.jQuery('#executor-list').DataTable()
    
        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}
  
function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    execModel.Delete(id);
}
  
window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})






