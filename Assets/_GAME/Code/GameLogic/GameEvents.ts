import { NetworkSignal } from "@Easy/Core/Shared/Network/NetworkSignal";

export default class GameEvents extends AirshipBehaviour {
	//Client Requests
	public static RequestAttack = new NetworkSignal<[]>("RequestAttack");
	//Server Notifies
	public static ShowAttack = new NetworkSignal<[ownerId: number, targetId: number]>("ShowAttack");
}
