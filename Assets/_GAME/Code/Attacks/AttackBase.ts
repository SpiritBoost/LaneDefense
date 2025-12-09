import Character from "@Easy/Core/Shared/Character/Character";
import GameEvents from "../GameLogic/GameEvents";
import { Bin } from "@Easy/Core/Shared/Util/Bin";
import { Airship } from "@Easy/Core/Shared/Airship";

export default class AttackBase extends AirshipBehaviour {
	@Header("Reference")
	public owner: Character;
	@Header("Templates")
	public attackTemplate?: GameObject;
	@Header("Variables")
	public cooldown = 1;

	private bin = new Bin();
	private nextValidAttackTime = 0;

	protected Awake(): void {
		this.bin.Add(
			GameEvents.ShowAttack.client.OnServerEvent((ownerId, targetId) => {
				if (this.owner.id === ownerId) {
					//We are running this attack
					this.OnAttack(Airship.Characters.FindById(targetId));
				}
			}),
		);
	}

	///Runs attack logic
	public ServerAttack(target: Character | undefined) {
		if (Time.time < this.nextValidAttackTime) {
			return false;
		}

		this.nextValidAttackTime = Time.time + this.cooldown;

		//Tell clients about attack
		GameEvents.ShowAttack.server.FireAllClients(this.owner.id, target ? target.id : -1);

		return true;
	}

	//Plays attack visuals
	public OnAttack(target: Character | undefined) {
		if (this.attackTemplate) {
			Instantiate(
				this.attackTemplate,
				target !== undefined ? target.transform.position : this.transform.position,
				this.transform.rotation,
			);
		}
	}
}
