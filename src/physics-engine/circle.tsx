import { Circle, CircleProps } from "@motion-canvas/2d/lib/components";
import { initial, signal } from "@motion-canvas/2d/lib/decorators";
import { SignalValue, SimpleSignal } from "@motion-canvas/core/lib/signals";
import { Bodies, Body, Composite, Engine, World } from "matter-js";

export interface PCircleProps extends CircleProps {
    world?: SignalValue<World>;
}

export class PCircle extends Circle {
    @initial(Engine.create({}).world)
    @signal()
    public declare readonly world: SimpleSignal<World, this>;

    public readonly circle: Body;

    public constructor(props?: PCircleProps) {
        super({...props});
        
        this.circle = Bodies.circle(this.position.x(), this.position.y(), this.width() / 2);
        Composite.add(this.world(), [this.circle]);
    }

    public update() {
        this.position.x(this.circle.position.x);
        this.position.y(this.circle.position.y);
    }
}