uniform vec3 uBottomColor;
uniform vec3 uTopColor;

varying vec3 vNormal;
varying vec2 vUv;

void main()
{
    vec3 color = mix(uBottomColor, uTopColor, vNormal.y);

    gl_FragColor = vec4(color, 1.0);
}