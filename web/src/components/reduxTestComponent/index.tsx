import { Space, Button, Spin } from 'antd';
import { useRootDispatch, useRootSelector } from '../../hooks';
import { userGetUserInfo, goodsGetGoodsListThunk } from '../../store/models';

export default function Test() {
  const { user, goods } = useRootSelector(state => state);
  const dispatch = useRootDispatch();
  return (
    <Spin spinning={!!goods.loading}>
      <Space>
        <div>
          userInfo: {user.addr} - {user.age} - {user.company} - {user.name} - {user.random}
        </div>
        <div>
          <p>goodsInfo: {goods.baseInfo.from} - {goods.baseInfo.to} - {goods.baseInfo.userName} - {goods.randomKey}</p>
          <p>goodsList: {goods.list.map((e) => `${e.goodsId} - ${e.goodsName}`).join(' ||| ')}</p>
        </div>
        <Button onClick={() => {
          dispatch({
            type: 'UserModel/updateUser',
            payload: { name: 'yyy' },
          });
        }} type='primary'>update userName</Button>
        <Button type='primary' onClick={() => {
          dispatch(userGetUserInfo({ name: '李四', addr: '四川南充', age: 22, company: '杭州市公安局' }));
        }}>getUserInfo</Button>
        <Button type='primary' onClick={() => {
          dispatch(goodsGetGoodsListThunk({ randomKey: Math.random() }));
        }}>update goodsRandomKey</Button>
        <Button type='primary' onClick={() => {
          dispatch(goodsGetGoodsListThunk({ list: [
            { goodsId: 1, goodsName: 'goods1' },
            { goodsId: 2, goodsName: 'goods2' },
            { goodsId: 3, goodsName: 'goods3' }
            ]
          }));
        }}>update goodsList</Button>
      </Space>
    </Spin>
  );
};
