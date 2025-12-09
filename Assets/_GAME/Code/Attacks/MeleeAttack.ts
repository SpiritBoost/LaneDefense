import Character from "@Easy/Core/Shared/Character/Character";
import AttackBase from "./AttackBase";

export default class MeleeAttack extends AttackBase {
	public damageAmount = 1;

	override ServerAttack(target: Character) {
		if (super.ServerAttack(target)) {
			if (target !== undefined) {
				target.InflictDamage(this.damageAmount, this.owner.gameObject);
			}
			return true;
		}
		return false;
	}
}
