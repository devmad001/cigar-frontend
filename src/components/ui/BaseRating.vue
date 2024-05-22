<template>
  <div class="rating-holder">
    <div class="c-rating c-rating--small" :data-rating-value="ratingValue">
      <button aria-label="rating 1"></button>
      <button aria-label="rating 2"></button>
      <button aria-label="rating 3"></button>
      <button aria-label="rating 4"></button>
      <button aria-label="rating 5"></button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rating'],
  computed: {
    ratingValue() {
      if (this.rating && this.rating[1] && this.rating[1] === '.' && this.rating[2] === '0') return parseInt(this.rating)
      return this.rating;
    }
  }
}
</script>

<style lang="scss" scoped>
$rating-min-value: 0 !default;
$rating-max-value: 5 !default;
$rating-steps-value: .10 !default;
$rating-color-empty: '%23ddd' !default;
$rating-color-full: rgba(#F7C03D, 0.99) !default;
$rating-icons-paths: (
  quarter: 'M196.208 415.2v-224.8l-139.504 20.272 100.944 98.384-23.84 138.928z',
  half: 'M258.672 64l-62.384 126.4-139.504 20.272 100.944 98.384-23.84 138.928 124.768-65.6v-318.4z',
  three-quarters: 'M321.616 190.496l-0.656-0.096-62.384-126.4-62.384 126.4-139.504 20.272 100.944 98.384-23.84 138.928 124.768-65.6 63.024 33.136z',
  full: 'M457.888 210.672l-139.504-20.272-62.384-126.4-62.384 126.4-139.504 20.272 100.944 98.384-23.84 138.928 124.768-65.6 124.768 65.6-23.84-138.928c0 0 100.944-98.384 100.944-98.384z'
);

/// @return {list} 
@function rating-values() {
  $rating-values: ();

  @for $i from $rating-min-value through ($rating-max-value / $rating-steps-value) {
    $rating-value: abs($i * $rating-steps-value);
    $rating-values: append($rating-values, $rating-value, 'comma');
  }

  @return $rating-values;
}

/// @param {string} $icon
/// @param {color} $color
/// @return {string}
@function get-icon($icon, $color) {
  @if not index(quarter half three-quarters full, $icon) {
    @error "Interaction type must be either `quarter`, `half`, `three-quarters` or `full`.";
  }
  
  @return url('data:image/svg+xml;utf8,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20width%3D%22512%22%20height%3D%22512%22%20viewBox%3D%220%200%20512%20512%22%3E%3Cpath%20fill%3D%22' + $color + '%22%20d%3D%22' + map-get($rating-icons-paths, $icon) + '%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E') center / cover no-repeat;
}

@mixin c-rating($star-size: 20px, $star-element: button, $interaction-type: representative) {
  @if not index(clickable representative, $interaction-type) {
    @error "Interaction type must be either `clickable` or `representative`.";
  }
  
  #{$star-element} {
    display: inline-block;
    width: $star-size;
    height: $star-size;
    border: 0;
    text-indent: -9999px;
    outline: none;
    background: get-icon(full, $rating-color-empty);

    @if $interaction-type == clickable {
      cursor: pointer;
      transition: background 0.25s ease;
    }
  }

  @each $rating-value in rating-values() {
    $rating-value-ceil: ceil($rating-value);

    &[data-rating-value="#{$rating-value}"] {
      #{$star-element}:nth-child(-n+#{$rating-value-ceil}) {
        background: get-icon(full, $rating-color-full);
      }

      #{$star-element}:nth-child(#{$rating-value-ceil}) {
        @if str-slice("#{$rating-value}", 2, 4) == '.25' {
          background: get-icon(quarter, $rating-color-full), get-icon(full, $rating-color-empty)
        }
        @else if str-slice("#{$rating-value}", 2, 4) == '.5' {
          background: get-icon(half, $rating-color-full), get-icon(full, $rating-color-empty)
        }
        @else if str-slice("#{$rating-value}", 2, 4) == '.75' {
          background: get-icon(three-quarters, $rating-color-full), get-icon(full, $rating-color-empty)
        }
      }
    }
  }
}

/// @param {number} target - The value to be converted
/// @param {number} context [$msuxf-font-size] The base font size
/// @return {em} value
@function toem($target, $context: 16px) {
  @if $target == 0 {
    @return 0
  }

  @return $target / $context+0em;
}

.rating-holder {
  display: inline-block;
  background-color: #fff;
  border-radius: toem(25px);
  box-sizing: border-box;
  padding-bottom: 2px;
}

.c-rating {
  @include c-rating(toem(18px));
}
</style>
