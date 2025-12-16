import Character from "@Easy/Core/Shared/Character/Character";
import EntityHealthController from "./EntityHealthController";

@RequireComponent<EntityHealthController>()
@RequireComponent<Rigidbody>()
export default class EntityController extends AirshipBehaviour {
	@Header("References")
	public character: Character;
	public rigid: Rigidbody;
	public health: EntityHealthController;

	@Header("Variables")
	public maxHealth = 10;

	protected Awake(): void {
		this.character.SetMaxHealth(this.maxHealth);    
	}

	public GetRoot(collider: Collider) {
		if (collider.attachedRigidbody) {
			return collider.attachedRigidbody.transform;
		} else {
			return collider.transform;
		}
	}
}
