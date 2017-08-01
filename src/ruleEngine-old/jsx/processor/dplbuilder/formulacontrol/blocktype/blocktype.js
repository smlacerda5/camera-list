var keyMirror = require('keymirror');

// note : block control��, ��->�� �ܹ��� ���������� ���� �� �ۿ� ����  config model ��� ����
//        �ּ����� config ���� ��ɸ��� �����ϴ� config model control�Դϴ�.
//        block node�� �����ϴ� react ��ü�� ������ ª�� ������ �����ϴ�.
//        Ÿ �ĺ� �𵨷δ�,
//        1. detail page�� ������ ������ ������ ���� rule�� �����ϴ� control (������ loading�� �ʿ� ������ detail rule ������ ���� ���� ���⵵�� ���� ������ ����),
//        2. detail page�� ������ ������ ������ ���� block control (�ϰ� loading �δ�, control � �δ�)
//        3. formula ���� ���� �Ⱓ�� ������ ������ ������ ���� block control (control � �δ�)
//        ���� �ֽ��ϴ�.
//        Ÿ �� ���, loading ���� �л� ȿ��, � �δ�(Ÿ �𵨵��� ��������� �� ������ ��, ���� ������ �ؾ� ��)�� ����, ���ǿ� ���� ���� ���� ���ǿ� �����մϴ�.
//        �������δ�, ���� ������, ���� �޸� assign�� ���� �޸� ����ȭ, �� ������ ���� ��Ұ� ��������� Ů�ϴ�.
//        �� �𵨷� ����ȭ�� ���� �� �����̸�, ġ������ ���� �߻��� ��� ������ Ÿ �𵨷� �� ���� �� �� �ֽ��ϴ�.
//        control Ư���� data format�̳� render�� ������ ��ġ�� �����Ƿ�, �籸���� ���� �δ��� �ټ� ���� �� �Դϴ�.

// note : �� block control���� interface�� ��ȣ ���� ���ۿ� �ʿ��� �Լ����� ���� �����ϰ� �ֽ��ϴ�.
//        ���� ������� ES5�� ������ �Ǵ� ȯ�濡�� ES6�� �ٺ����� ������ ����ϱ� ������,
//        ��� ��ü mixin, type identification ��ü ��Ÿ���� ����, ����, ���� �������� ���� �ʴ� �Ǵ� �˴ϴ�.
//        �̿�, control�� view�� 1:1 ��Ī ������ �����ϰ� �ֽ��ϴ�.
//        ���⵵ ���� ������ ������ ǥ������ ���, ���ʿ��� ���鰳�� block view�� ���� �� �ִµ�,
//        �־�̴� �ڵ� ������ ���� ���� ���� �������̽� ������ ��Ÿ�������� �ϴ� ������ �ɰ��� ���� ���ϸ� ���� �� �� ���� ������ ���� �˴ϴ�.
//        ��������� model ���⵵�� ���� formula ǥ������ ���������� ����, formula block �� control�� ���� �����ϴ� ���¸� ���ϰ� �ֽ��ϴ�.
//        Ȥ���� �� �ڸ�Ʈ�� Ȯ�� �Ͻô� �е� �߿�, �� ���� ���̵� ������ ��� ���� ��Ź �帳�ϴ�.

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