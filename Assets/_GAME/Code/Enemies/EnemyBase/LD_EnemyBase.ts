import LD_EnemyLaneMovement from "./LD_EnemyLaneMovement";

export default class LD_EnemyBase extends AirshipBehaviour {
	public movement: LD_EnemyLaneMovement;
	public friendlyName = "Enemy";
	public layerMask: LayerMask;

	protected LateUpdate(dt: number): void {
		const colliders = Physics.OverlapBox(
			this.transform.position.add(new Vector3(0, 0, 1)),
			new Vector3(0.5, 0.5, 0.5),
			Quaternion.identity,
			this.layerMask.value,
		);
		for (const collider of colliders) {
			print("HIT: " + this.GetRoot(collider).gameObject.name);
		}

		this.movement.enabled = colliders.size() === 0;
	}

	private GetRoot(collider: Collider) {
		if (collider.attachedRigidbody) {
			return collider.attachedRigidbody.transform;
		} else {
			return collider.transform;
		}
	}
}
