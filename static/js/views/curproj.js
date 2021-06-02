'use strict'

const execModel = new Executor();
const projModel = new Project();
const curprojModel = new Curproj()

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
    initSelectTag('executor', execModel);
    initSelectTag('project', projModel);

    const form = window.document.querySelector('#curproj-add-form')

    form.addEventListener('submit', function(e) {
        e.preventDefault()

        const formData = new FormData(e.target)
        const curprojdata = {}
        formData.forEach((value, key) => {
            curprojdata[key] = value
        })

        curprojModel.Create(curprojdata)

        e.target.reset()
    })
}

function initList() {
    window.jQuery('#curproj-list').DataTable({
        data: curprojModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Project', data: 'project' },
            { title: 'Executor', data: 'executor' },
            { title: 'Begin time', data: 'begintime' },
            { title: 'End time', data: 'endtime' },
            { title: 'Delete', data: '' }
        ],
        columnDefs: [
            {
                render: function(data, type, row) {
                    let project = projModel.FindById(data);
                    return project.name;
                },
                targets: 1
            },
            {
                render: function(data, type, row) {
                    let executor = execModel.FindById(data);
                    return executor.name;
                },
                targets: 2
            },
            {
                render: function(data, type, row) {
                    return '<button type="button" value="delete" onclick="deleteItem(this)">Delete</button>';
                },
                targets: 5
            }
        ]
    })
}

function initListEvents() {
    document.addEventListener('curprojectsListDataChanged', function(e) {
        const dataTable = window.jQuery('#curproj-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

function deleteItem(e) {
    let row = e.parentNode.parentNode;
    let id = row.getElementsByTagName('td')[0].innerText;
    row.remove();
    curprojModel.Delete(id);
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
})
