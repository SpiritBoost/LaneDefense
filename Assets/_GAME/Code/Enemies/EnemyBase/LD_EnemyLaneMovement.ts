export default class LD_EnemyLaneMovement extends AirshipBehaviour {
	public moveSpeed = 1;

	protected Update(dt: number): void {
		this.transform.position = this.transform.position.add(new Vector3(-this.moveSpeed * dt, 0, 0));
	}
}
