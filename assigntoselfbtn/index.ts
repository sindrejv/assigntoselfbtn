import {IInputs, IOutputs} from "./generated/ManifestTypes";

export class assigntoselfbtn implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container: HTMLDivElement;
	private _notifyOutputChanged: () => void;
	private _context: ComponentFramework.Context<IInputs>
	private _button: HTMLButtonElement;
	private _userId: string;
	private _userName: string;
	private _buttontext: string;
	
	private _nb_buttontext: "Tildel saken til meg" // nb = Norwegian Bokmål
	private _en_buttontext: "Assign case to me" // en = english


	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{
		// Add control initialization code
		this._context = context
		this._container = container
		const _current_language = context.userSettings.languageId;

		if(_current_language === 1044){ //Norwegian
			this._buttontext = this._nb_buttontext;
		}else if(_current_language === 1033){ // English
			this._buttontext = this._en_buttontext
		}else{
			this._buttontext = this._en_buttontext
		}

		this._notifyOutputChanged = notifyOutputChanged;
		this._button = document.createElement("button");
		this._container.appendChild(this._button);
		this._button.addEventListener("click", this.onButtonClick.bind(this));
		this._button.innerHTML= this._buttontext;
		this._button.classList.add("btn");
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		// Add code to update control view
	}

	private onButtonClick(event: Event): void {		
		this._userId = this._context.userSettings.userId
		this._userName = this._context.userSettings.userName
		this._userId= this._userId.slice(1,37) // Removing curly brackets
		this._notifyOutputChanged();
	}
	/**
	 * It is called by the framework prior to a control receiving new data.
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			pp_assigntoselfbtnpcf: this._userId, // Changing value for the Web Resource logic
			ownerid: [{id: this._userId, name: this._userName, entityType: "systemuser"}  ]
		};
	}

	/**
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		// Add code to cleanup control if necessary
	}
}
