uniform vec3 uRing1Color1;
uniform vec3 uRing1Color2;
uniform float uRingScale;

uniform float uRingWidth;
uniform float uRingPosX;

uniform float uTime;

varying vec3 vNormal;
varying vec2 vUv;

void main()
{
    // float ring1Strength = step(uRingScale, distance(vec2(vUv.x * uRingWidth, vUv.y), vec2(uRingPosX, 0.5)));
    // vec3 ring1Color = mix(uRing1Color, vec3(1), ring1Strength);

    // float ring2Strength = step(uRingScale, distance(vec2(vUv.x * uRingWidth, vUv.y), vec2(uRingPosX - 0.4, 0.5)));
    // vec3 ring2Color = mix(vec3(1, 0, 0), vec3(1), ring2Strength);

    // vec3 finalColor = ring1Color * ring2Color;

    // gl_FragColor = vec4(finalColor, 1.0);



    // gl_FragColor = vec4(vUv, 1.0, 1.0);



    vec2 uv = vUv;

    float strength = 100.0;

    float x = (uv.x) * (uv.y) * uTime * 100.0;

    vec4 grain = vec4(mod((mod(x, 13.0) + 1.0) * (mod(x, 123.0) + 1.0), 0.01)-0.005) * strength;

    vec3 color = mix(uRing1Color1, uRing1Color2, grain.y);

    gl_FragColor = vec4(color, 1.0);



    // uv = vec2(circular(vUv));

    // vec3 color = mix(uRing1Color1, uRing1Color2, uv.x);

    // gl_FragColor = vec4(blur(vUv), 1.0);
}