import { Game } from "@Easy/Core/Shared/Game";
import EntityController from "_GAME/Code/EntityBase/EntityController";

export default class ProjectileController extends AirshipBehaviour {
    public speed = 5;
    public lifetime = 10;
    public layerMask: LayerMask;
    protected OnEnable(): void {
        if(Game.IsServer()) {
            task.delay(this.lifetime, ()=> {
                NetworkServer.Destroy(this.gameObject);
            });
        }
    }

    protected Update(dt: number): void {
        const lastPos = this.transform.position;
        this.transform.position = lastPos.add(this.transform.right.mul(this.speed * dt));

        let color = Color.red;

        if(Game.IsServer()) {
            const [hit, point, normal, collider] = Physics.Raycast(lastPos, this.transform.right, this.speed * dt, this.layerMask.value, QueryTriggerInteraction.Ignore);
            if(hit) {
                color = Color.green;
                const entity = collider.attachedRigidbody?.gameObject?.GetAirshipComponent<EntityController>();
                if(entity) {
                    print("HIT SOMETHING: " + entity.gameObject.name);
                    NetworkServer.Destroy(this.gameObject);
                }
            }
            
            GizmoUtils.DrawSphere(lastPos, .025, color, 4, 5);
            GizmoUtils.DrawSphere(lastPos.add(this.transform.right.mul(this.speed * dt)), .01, color, 4, 5);
            GizmoUtils.DrawSingleLine(lastPos, lastPos.add(this.transform.right.mul(this.speed * dt)), color, 5);
        }

    }
}
