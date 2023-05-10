import { Rect, RectProps } from "@motion-canvas/2d/lib/components";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { Bodies, Body, Composite, Engine, World } from "matter-js";

export interface PRectangleProps extends RectProps {
    world?: SignalValue<World>;
}

export class PRectangle extends Rect {
    @initial(Engine.create({}).world)
    @signal()
    public declare readonly world: SimpleSignal<World, this>;

    public readonly rect: Body;

    public constructor(props?: PRectangleProps) {
        super({...props});
        
        this.rect = Bodies.rectangle(this.position.x(), this.position.y(), this.width(), this.height());
        Composite.add(this.world(), [this.rect]);
    }

    public update() {
        this.position.x(this.rect.position.x);
        this.position.y(this.rect.position.y);
        this.rotation(this.rect.angle * (180/Math.PI));
    }
}