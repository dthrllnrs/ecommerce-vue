<template>
 <div class="modal fade" id="cartModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">My <span class="text-primary">Cart</span></h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col" style="width: 70%">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Total</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="cartProduct in cartProducts">
                <tr>
                  <td><CartProduct :product="cartProduct.product" /></td>
                  <td><input min="1" type="number" class="form-control" :value="cartProduct.quantity" @change="handleQuantityChange(cartProduct.product, $event.target.value)"></td>
                  <td class="currency"><span>{{ USDollar.format(cartProduct.product.price) }}</span></td>
                  <td class="currency"><span>{{ USDollar.format(cartProduct.total) }}</span></td>
                  <td class="text-center"><button class="btn btn-danger" @click="handleRemoveProduct(cartProduct.product)">&#x00d7;</button></td>
                </tr>
              </template>
            </tbody>
          </table>
          <div class="d-flex justify-content-end">
            <div class="grand-total-container">
              <span class="text-primary fw-bold fs-5">Grand Total: <span class="text-black">{{ USDollar.format(grandTotal) }}</span></span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary fw-bold text-white">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  </div> 
</template>
<script>
import { USDollar } from '@/helpers/formatters';
import { useProductStore } from '@/stores/productStore';
import { mapState } from 'pinia';
import CartProduct from '@/components/cart/CartProduct.vue';

export default {
  setup() {
    const productStore = useProductStore();
      return {
          productStore,
          USDollar,
      };
  },
  components: {
    CartProduct,
  },
  computed: {
    ...mapState(useProductStore, ['cartProducts']),
    grandTotal() {
      return this.productStore.cartTotal;
    },    
  },
  methods: {
    handleQuantityChange(product, quantity) {
      if (quantity < 1) {
        quantity = 1;
      }
      this.productStore.modifyCartProductQuantity(product, parseInt(quantity));
    },
    handleRemoveProduct(product) {
      if (confirm(`Remove ${product.name} from cart?`) === true) {
        this.productStore.removeCartProduct(product);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .table {
    tbody {
      td {
        vertical-align: middle;
        .currency {
          text-align: right;
        }
      }
    }
  }
</style>