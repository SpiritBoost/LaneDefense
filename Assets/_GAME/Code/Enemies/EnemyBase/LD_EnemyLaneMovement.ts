import { Game } from "@Easy/Core/Shared/Game";

export default class LD_EnemyLaneMovement extends AirshipBehaviour {
	public moveSpeed = 1;

	protected Update(dt: number): void {
		if (!Game.IsServer()) {
			return;
		}
		this.transform.position = this.transform.position.add(new Vector3(-this.moveSpeed * dt, 0, 0));
	}
}
