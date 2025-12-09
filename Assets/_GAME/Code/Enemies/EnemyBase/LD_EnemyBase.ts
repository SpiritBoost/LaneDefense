import { Game } from "@Easy/Core/Shared/Game";
import LD_EnemyLaneMovement from "./LD_EnemyLaneMovement";
import EntityController from "_GAME/Code/EntityBase/EntityController";
import AttackBase from "_GAME/Code/Attacks/AttackBase";

export default class LD_EnemyBase extends AirshipBehaviour {
	public movement: LD_EnemyLaneMovement;
	public attack: AttackBase;
	public friendlyName = "Enemy";
	public layerMask: LayerMask;

	protected LateUpdate(dt: number): void {
		if (!Game.IsServer()) {
			return;
		}
		const colliders = Physics.OverlapBox(
			this.transform.position.add(new Vector3(0, 0, 1)),
			new Vector3(0.5, 0.5, 0.5),
			Quaternion.identity,
			this.layerMask.value,
		);

		for (const collider of colliders) {
			const root = this.GetRoot(collider);
			print("HIT: " + root.gameObject.name);
			const entity = root.gameObject.GetAirshipComponent<EntityController>();
			if (entity && entity.character) {
				this.attack.ServerAttack(entity.character);
			}
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
