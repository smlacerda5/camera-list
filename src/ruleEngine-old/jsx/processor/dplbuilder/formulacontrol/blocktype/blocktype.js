var keyMirror = require('keymirror');

// note : block control은, 상->하 단방향 계층구조를 가질 수 밖에 없는  config model 제어를 위해
//        최소한의 config 제어 명령만을 구현하는 config model control입니다.
//        block node를 구현하는 react 객체와 동일한 짧은 수명을 가집니다.
//        타 후보 모델로는,
//        1. detail page와 동일한 수명을 가지는 통합 rule을 구현하는 control (별도의 loading이 필요 없으나 detail rule 설정을 위한 높은 복잡도를 가질 것으로 예상),
//        2. detail page와 동일한 수명을 가지는 개별 block control (일괄 loading 부담, control 운영 부담)
//        3. formula 선택 유지 기간과 동일한 수명을 가지는 개별 block control (control 운영 부담)
//        등이 있습니다.
//        타 모델 대비, loading 부하 분산 효과, 운영 부담(타 모델들은 상대적으로 긴 수명동안 값, 참조 유지를 해야 함)이 적고, 조건에 따른 개별 동작 정의에 용이합니다.
//        단점으로는, 구현 모형상, 잦은 메모리 assign에 따른 메모리 단편화, 릭 유발의 위험 요소가 상대적으로 큽니다.
//        현 모델로 안정화를 수행 할 예정이며, 치명적인 결함 발생시 상기 나열된 타 모델로 재 구현 될 수 있습니다.
//        control 특성상 data format이나 render에 영향을 미치지 않으므로, 재구현에 대한 부담은 다소 적은 편 입니다.

// note : 각 block control들은 interface의 보호 없이 동작에 필요한 함수들을 각각 구현하고 있습니다.
//        최종 결과물이 ES5로 컨버팅 되는 환경에서 ES6의 근본적인 목적을 기대하기 어려우며,
//        상속 대체 mixin, type identification 대체 덕타이핑 역시, 성능, 관리 관점에서 좋지 않다 판단 됩니다.
//        이에, control과 view의 1:1 매칭 패턴을 구현하고 있습니다.
//        복잡도 높은 수식을 가지는 표현식의 경우, 수십에서 수백개의 block view를 가질 수 있는데,
//        있어보이는 코딩 구현을 위해 각각 블럭의 인터페이스 추출을 덕타이핑으로 하는 행위는 심각한 성능 저하를 가져 올 수 있을 것으로 예상 됩니다.
//        상대적으로 model 복잡도가 높은 formula 표현식의 유지보수를 위해, formula block 당 control을 각각 구현하는 형태를 취하고 있습니다.
//        혹여나 본 코멘트를 확인 하시는 분들 중에, 더 나은 아이디어가 있으신 경우 조언 부탁 드립니다.

module.exports = keyMirror({
    TCONTAINER: null,
    VCONTAINER: null,
    ACONTAINER: null,
    CCONTAINER: null,
    NULL: null,
    TEXT: null,
    NUMBER: null,
    CAST: null,
    REF: null,
    POSTREF: null,
    BRACKET: null,
    FUNC: null,
    CASE: null,
    BOOLBIN: null,
    BOOLCOMP: null
});