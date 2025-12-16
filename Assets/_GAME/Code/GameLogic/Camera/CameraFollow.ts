import { Airship } from "@Easy/Core/Shared/Airship";
import { Bin } from "@Easy/Core/Shared/Util/Bin";

export default class CameraFollow extends AirshipBehaviour {
    public moveSpeed = 4;
    private followTarget: Transform;
    private bin = new Bin();
    private vel = 0;

    protected OnEnable(): void {
        this.bin.Add(Airship.Characters.onCharacterSpawned.Connect((character)=> {
            character.WaitForInit();
            if(character.IsLocalCharacter()) {
                this.followTarget = character.transform;
            }
        }));
    }

    protected OnDisable(): void {
        this.bin.Clean();
    }

    protected LateUpdate(dt: number): void {
        if(!this.followTarget) {
            return;
        }

        let newX = Mathf.SmoothDamp(this.transform.position.x, this.followTarget.position.x, this.vel, dt, this.moveSpeed);

        this.transform.position = this.transform.position.WithX(newX);
    }
}
