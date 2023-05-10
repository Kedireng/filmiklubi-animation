import { Circle } from '@motion-canvas/2d/lib/components';
import {makeScene2D} from '@motion-canvas/2d/lib/scenes';
import { createRef } from '@motion-canvas/core/lib/utils';

import { Constraint, Engine, Bodies, Composite } from 'matter-js';
import { PRectangle } from '../physics-engine/rectangle';
import { PCircle } from '../physics-engine/circle';

export default makeScene2D(function* (view) {
    var engine = Engine.create({});
    var world = engine.world;

    const rect = createRef<PRectangle>();
    const circle = createRef<PCircle>();

    view.add(
        <PRectangle
            ref={rect}
            x={200}
            y={-80}
            width={80}
            height={80}
            fill="#e13238"
            world={world}
        />
    );
    view.add(
        <PCircle
            ref={circle}
            x={50}
            y={250}
            width={100}
            height={100}
            fill="#e13238"
            world={world}
        />
    );

    Composite.add(world, Constraint.create({
        pointA: { x: 500, y: -600 },
        bodyB: circle().circle
    }));
    
    for(let i = 0; i < 100; i++) {
        Engine.update(engine, 1000 / 60);

        rect().update();
        circle().update();
    
        yield;
    }
});
