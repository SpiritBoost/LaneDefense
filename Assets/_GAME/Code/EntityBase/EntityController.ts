import EntityHealthController from "./EntityHealthController";

@RequireComponent<EntityHealthController>()
@RequireComponent<Rigidbody>()
export default class EntityController extends AirshipBehaviour {
	public rigid: Rigidbody;
	public health: EntityHealthController;
}
