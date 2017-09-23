import React from 'react';
import PropTypes from 'prop-types';

class AddFishForm extends React.Component {

    createFish = event => {
        event.preventDefault();
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value,
        }
        this.props.addFish(fish);
        this.fishForm.reset();
    };

    render() {
        return (
            <form ref={input => this.fishForm = input}  className="fish-edit" onSubmit={e => this.createFish(e)}>
                <input ref={input => this.name = input} type="text" placeholder="商品名称"/>
                <input ref={input => this.price = input} type="text" placeholder="商品价格"/>
                <select ref={input => this.status = input} >
                    <option value="available">新鲜可售!</option>
                    <option value="unavailable">卖完啦!</option>
                </select>
                <textarea ref={input => this.desc = input} placeholder="商品描述"></textarea>
                <input ref={input => this.image = input} type="text" placeholder="商品图片"/>
                <button type="submit">+ 添加商品</button>
            </form>
        );
    }
}

AddFishForm.propTypes = {
    addFish: PropTypes.func.isRequired
};

export default AddFishForm;