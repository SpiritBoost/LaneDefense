import { Bin } from "@Easy/Core/Shared/Util/Bin";
import EntityController from "../EntityBase/EntityController";

export default class BaseController extends EntityController {
	private bin = new Bin();

	override Start(): void {
		print("Hello, World! from BaseController!");
		this.bin.Add(
			this.character.onHealthChanged.Connect((newHealth, oldHealth) => {
				const damageAmount = oldHealth - newHealth;
				print("Recieved damage: " + damageAmount);
			}),
		);
	}

	protected OnDisable(): void {
		this.bin.Clean();
	}
}
