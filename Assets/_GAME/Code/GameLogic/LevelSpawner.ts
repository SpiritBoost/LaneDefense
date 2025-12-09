import { Game } from "@Easy/Core/Shared/Game";
import LevelController from "./LevelController";
import { Airship } from "@Easy/Core/Shared/Airship";

export default class LevelSpawner extends AirshipBehaviour {
	@Header("Templates")
	public enemyTemplates: GameObject[] = [];

	@Header("Reference")
	public spawnZone: Transform;

	@Header("Variables")
	public enemiesPerSecond = 1;

	private nextSpawnTime = 0;

	protected LateUpdate(dt: number): void {
		if (Game.IsServer()) {
			if (Time.time > this.nextSpawnTime) {
				this.Spawn();
			}
		}
	}

	private Spawn() {
		this.nextSpawnTime = Time.time + 1 / this.enemiesPerSecond;
		Airship.Characters.SpawnNonPlayerCharacter(
			this.spawnZone.position.add(
				new Vector3(math.random() * 2 - 1, 0, LevelController.Get().GetRandomLanePos()),
			),
			{ customCharacterTemplate: this.enemyTemplates[0] },
		);
	}
}
