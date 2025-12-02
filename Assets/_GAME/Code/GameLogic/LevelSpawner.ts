import LevelController from "./LevelController";

export default class LevelSpawner extends AirshipBehaviour {
	@Header("Templates")
	public enemyTemplates: GameObject[] = [];

	@Header("Reference")
	public spawnZone: Transform;

	@Header("Variables")
	public enemiesPerSecond = 1;

	private nextSpawnTime = 0;

	protected LateUpdate(dt: number): void {
		if (Time.time > this.nextSpawnTime) {
			this.Spawn();
		}
	}

	private Spawn() {
		this.nextSpawnTime = Time.time + 1 / this.enemiesPerSecond;
		const enemy = Instantiate(this.enemyTemplates[0], this.transform);
		enemy.transform.position = this.spawnZone.position.add(
			new Vector3(math.random() * 2 - 1, 0, LevelController.Get().GetRandomLanePos()),
		);
	}
}
