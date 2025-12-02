export default class EntityHealthController extends AirshipBehaviour {
	public maxHealth = 10;

	private currentHealth = 0;
	protected Awake(): void {
		this.currentHealth = this.maxHealth;
	}

	public TakeDamage(amount: number) {
		this.currentHealth -= amount;
		if (this.currentHealth <= 0) {
			this.currentHealth = 0;
			this.Die();
		}
	}

	public Heal(amount: number) {
		this.currentHealth = math.min(this.maxHealth, this.currentHealth + amount);
	}

	public Die() {
		print("DEAD");
	}
}
