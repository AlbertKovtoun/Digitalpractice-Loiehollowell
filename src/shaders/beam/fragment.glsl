uniform vec3 uBeamColor;

varying vec2 vUv;

void main()
{
    // gl_FragColor = vec4(vUv, 1.0, 1.0);

    float alpha = 1.0 - distance(vec2(vUv.x), vec2(0.5))* 2.0;

    alpha *= distance(vec2(vUv.y), vec2(1.0)); 

    // gl_FragColor = vec4(vec3(alpha), 1.0);
    
    gl_FragColor = vec4(uBeamColor, alpha);
}