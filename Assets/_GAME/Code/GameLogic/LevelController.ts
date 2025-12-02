export default class LevelController extends AirshipSingleton {
	public numberOfLanes = 5;

	public GetRandomLaneIndex() {
		return math.floor(math.random() * this.numberOfLanes);
	}

	public GetRandomLanePos() {
		return this.GetLanePosFromIndex(this.GetRandomLaneIndex());
	}

	public GetLanePosFromIndex(index: number) {
		return index - this.numberOfLanes / 2 + 0.5;
	}
}
