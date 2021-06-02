class Executor extends BaseModel{
	constructor(){
		super('executors')
        this.fields = this.fields.concat([
            'name',
            'code',
            'experience',
			'workers_ammount'
        ])
	}
}