class Curproj extends BaseModel{
	constructor(){
		super('curprojects')
        this.fields = this.fields.concat([
            'project',
            'executor',
            'begintime',
			'endtime'
        ])
	}
}