float rand(float n){return fract(sin(n) * 43758.5453123);}

uniform float uTime;

varying vec2 vUv;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    modelPosition.x += rand(uTime) * 0.02;
    modelPosition.z += rand(uTime) * 0.02;

    vec4 viewPosition = viewMatrix * modelPosition;

    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vUv = uv;
}