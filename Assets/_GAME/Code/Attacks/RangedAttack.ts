import Character from "@Easy/Core/Shared/Character/Character";
import AttackBase from "./AttackBase";

export default class RangedAttack extends AttackBase {
	public damageAmount = 1;

	override ServerAttack(target: Character) {
		if (super.ServerAttack(target)) {
			return true;
		}
		return false;
	}
}
