import Character from "@Easy/Core/Shared/Character/Character";
import GameEvents from "../GameLogic/GameEvents";
import { Bin } from "@Easy/Core/Shared/Util/Bin";
import { Airship } from "@Easy/Core/Shared/Airship";
import { Game } from "@Easy/Core/Shared/Game";

export default class AttackBase extends AirshipBehaviour {
	@Header("Reference")
	public owner: Character;
	@Header("Templates")
	public attackTemplateClient?: GameObject;
	public attackTemplateServer?: GameObject;
	@Header("Variables")
	public cooldown = 1;

	private bin = new Bin();
	private nextValidAttackTime = 0;

	protected Awake(): void {
        if(Game.IsClient()) {
            this.bin.Add(
                GameEvents.ShowAttack.client.OnServerEvent((ownerId, targetId) => {
                    if (this.owner.id === ownerId) {
                        //We are running this attack
                        this.OnAttack(Airship.Characters.FindById(targetId));
                    }
                }),
            );
        }
	}

	///Runs attack logic
	public ServerAttack(target: Character | undefined) {
		if (Time.time < this.nextValidAttackTime) {
			return false;
		}

		this.nextValidAttackTime = Time.time + this.cooldown;

		//Tell clients about attack
		GameEvents.ShowAttack.server.FireAllClients(this.owner.id, target ? target.id : -1);

        if(this.attackTemplateServer) {
            const go =  Instantiate(
                    this.attackTemplateServer,
                    target !== undefined ? target.transform.position : this.transform.position,
                    this.transform.rotation,
                );
            if(this.owner) {
                NetworkServer.Spawn(go, this.owner.gameObject);
            } else {
                NetworkServer.Spawn(go);
            }
        }

		return true;
	}

	//Plays attack visuals
	public OnAttack(target: Character | undefined) {
		if (this.attackTemplateClient) {
			return Instantiate(
				this.attackTemplateClient,
				target !== undefined ? target.transform.position : this.transform.position,
				this.transform.rotation,
			);
		}
	}
}
