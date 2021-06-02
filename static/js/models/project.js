class Project extends BaseModel{
	constructor(){
		super('projects')
        this.fields = this.fields.concat([
            'name',
            'number',
            'description',
			'customer',
			'min_exec_exp'
        ])
	}
}