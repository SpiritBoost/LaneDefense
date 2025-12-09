import { Bin } from "@Easy/Core/Shared/Util/Bin";
import AttackBase from "../Attacks/AttackBase";
import { Airship } from "@Easy/Core/Shared/Airship";
import { Binding } from "@Easy/Core/Shared/Input/Binding";
import GameEvents from "../GameLogic/GameEvents";
import Character from "@Easy/Core/Shared/Character/Character";
import { Game } from "@Easy/Core/Shared/Game";

export default class LDCharacter extends AirshipBehaviour {
	public character: Character;
	public attack: AttackBase;

	private bin = new Bin();

	protected OnEnable(): void {
		if (Game.IsClient()) {
			Airship.Input.CreateAction("Attack", Binding.Key(Key.F));
			Airship.Input.OnDown("Attack").Connect((e) => {
				if (this.character?.player) {
					GameEvents.RequestAttack.client.FireServer();
				}
			});
		}

		if (Game.IsServer()) {
			this.bin.Add(
				GameEvents.RequestAttack.server.OnClientEvent((player) => {
					if (this.character.player !== undefined && this.character.player.userId === player.userId) {
						this.attack.ServerAttack(this.character);
					}
				}),
			);
		}
	}

	protected OnDisable(): void {
		this.bin.Clean();
	}
}
