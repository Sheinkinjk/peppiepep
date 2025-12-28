<?php
/**
 * Plugin Name: Refer Labs Referral Integration
 * Description: Embed Refer Labs referral pages on WordPress with a shortcode, plus optional WooCommerce conversion capture.
 * Version: 1.0.0
 * Author: Refer Labs
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit;
}

define('REFERLABS_RI_OPTION_KEY', 'referlabs_ri_settings');

function referlabs_ri_default_settings() {
    return array(
        'origin' => 'https://referlabs.com.au',
        'discount_capture_secret' => '',
        'capture_on_status' => 'completed',
    );
}

function referlabs_ri_get_settings() {
    $defaults = referlabs_ri_default_settings();
    $saved = get_option(REFERLABS_RI_OPTION_KEY, array());
    if (!is_array($saved)) {
        $saved = array();
    }
    return array_merge($defaults, $saved);
}

function referlabs_ri_sanitize_settings($input) {
    $defaults = referlabs_ri_default_settings();
    $output = array();

    $origin = isset($input['origin']) ? trim((string) $input['origin']) : $defaults['origin'];
    $origin = esc_url_raw($origin);
    if (empty($origin)) {
        $origin = $defaults['origin'];
    }
    $output['origin'] = $origin;

    $secret = isset($input['discount_capture_secret']) ? trim((string) $input['discount_capture_secret']) : '';
    $output['discount_capture_secret'] = sanitize_text_field($secret);

    $capture_on = isset($input['capture_on_status']) ? (string) $input['capture_on_status'] : $defaults['capture_on_status'];
    $allowed = array('completed', 'processing', 'payment_complete');
    if (!in_array($capture_on, $allowed, true)) {
        $capture_on = $defaults['capture_on_status'];
    }
    $output['capture_on_status'] = $capture_on;

    return $output;
}

function referlabs_ri_register_settings() {
    register_setting(
        'referlabs_ri',
        REFERLABS_RI_OPTION_KEY,
        array(
            'type' => 'array',
            'sanitize_callback' => 'referlabs_ri_sanitize_settings',
            'default' => referlabs_ri_default_settings(),
        )
    );
}
add_action('admin_init', 'referlabs_ri_register_settings');

function referlabs_ri_add_settings_page() {
    add_options_page(
        'Refer Labs',
        'Refer Labs',
        'manage_options',
        'referlabs-ri',
        'referlabs_ri_render_settings_page'
    );
}
add_action('admin_menu', 'referlabs_ri_add_settings_page');

function referlabs_ri_render_settings_page() {
    if (!current_user_can('manage_options')) {
        return;
    }
    $settings = referlabs_ri_get_settings();
    ?>
    <div class="wrap">
        <h1>Refer Labs Integration</h1>
        <p>Use the shortcode <code>[referlabs_referral code="AMBCODE"]</code> to embed a referral page anywhere.</p>

        <form action="options.php" method="post">
            <?php settings_fields('referlabs_ri'); ?>

            <table class="form-table" role="presentation">
                <tr>
                    <th scope="row"><label for="referlabs_ri_origin">Refer Labs base URL</label></th>
                    <td>
                        <input
                            name="<?php echo esc_attr(REFERLABS_RI_OPTION_KEY); ?>[origin]"
                            id="referlabs_ri_origin"
                            type="url"
                            class="regular-text"
                            value="<?php echo esc_attr($settings['origin']); ?>"
                        />
                        <p class="description">Default is <code>https://referlabs.com.au</code>. Only change this if instructed.</p>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="referlabs_ri_discount_secret">Discount capture secret (optional)</label></th>
                    <td>
                        <input
                            name="<?php echo esc_attr(REFERLABS_RI_OPTION_KEY); ?>[discount_capture_secret]"
                            id="referlabs_ri_discount_secret"
                            type="password"
                            class="regular-text"
                            value="<?php echo esc_attr($settings['discount_capture_secret']); ?>"
                            autocomplete="new-password"
                        />
                        <p class="description">If you use WooCommerce coupons or a custom <code>discount_code</code> checkout field, this will report conversions back to Refer Labs.</p>
                    </td>
                </tr>

                <tr>
                    <th scope="row"><label for="referlabs_ri_capture_status">Capture conversions when order is</label></th>
                    <td>
                        <select
                            name="<?php echo esc_attr(REFERLABS_RI_OPTION_KEY); ?>[capture_on_status]"
                            id="referlabs_ri_capture_status"
                        >
                            <?php
                            $options = array(
                                'completed' => 'Completed',
                                'processing' => 'Processing',
                                'payment_complete' => 'Payment Complete',
                            );
                            foreach ($options as $value => $label) {
                                printf(
                                    '<option value="%s" %s>%s</option>',
                                    esc_attr($value),
                                    selected($settings['capture_on_status'], $value, false),
                                    esc_html($label)
                                );
                            }
                            ?>
                        </select>
                        <p class="description">Choose the point in the order lifecycle that best matches your workflow.</p>
                    </td>
                </tr>
            </table>

            <?php submit_button(); ?>
        </form>

        <hr />
        <h2>Shortcode parameters</h2>
        <ul>
            <li><code>code</code> (required): ambassador referral code</li>
            <li><code>height</code> (optional): iframe height in px (default <code>640</code>)</li>
            <li><code>radius</code> (optional): border radius in px (default <code>24</code>)</li>
            <li><code>embed</code> (optional): <code>1</code> to embed (default), <code>0</code> to render a link</li>
            <li><code>utm_source</code> / <code>utm_campaign</code> (optional): passed through to Refer Labs</li>
        </ul>
        <p>Example:</p>
        <p><code>[referlabs_referral code="OTS_1C2P-pgX" height="720" radius="32" utm_source="wordpress"]</code></p>
    </div>
    <?php
}

function referlabs_ri_shortcode($atts) {
    $atts = shortcode_atts(
        array(
            'code' => '',
            'height' => '640',
            'radius' => '24',
            'embed' => '1',
            'utm_source' => 'wordpress',
            'utm_campaign' => '',
        ),
        $atts,
        'referlabs_referral'
    );

    $code = sanitize_text_field((string) $atts['code']);
    if (empty($code)) {
        return '<p><strong>Refer Labs:</strong> Missing referral code. Example: <code>[referlabs_referral code="AMBCODE"]</code></p>';
    }

    $height = max(320, (int) $atts['height']);
    $radius = max(0, (int) $atts['radius']);
    $embed = (string) $atts['embed'] !== '0';

    $settings = referlabs_ri_get_settings();
    $origin = isset($settings['origin']) ? (string) $settings['origin'] : 'https://referlabs.com.au';
    $origin = rtrim($origin, '/');

    $query = array('embed' => '1');
    if (!empty($atts['utm_source'])) $query['utm_source'] = sanitize_text_field((string) $atts['utm_source']);
    if (!empty($atts['utm_campaign'])) $query['utm_campaign'] = sanitize_text_field((string) $atts['utm_campaign']);

    $src = esc_url($origin . '/r/' . rawurlencode($code) . '?' . http_build_query($query));

    if (!$embed) {
        return sprintf(
            '<a href="%s" rel="noopener" target="_blank">Open referral offer</a>',
            $src
        );
    }

    return sprintf(
        '<div class="referlabs-ri-embed"><iframe src="%s" title="Referral offer" style="width:100%%;min-height:%dpx;border:none;border-radius:%dpx;overflow:hidden;"></iframe></div>',
        $src,
        $height,
        $radius
    );
}
add_shortcode('referlabs_referral', 'referlabs_ri_shortcode');

function referlabs_ri_capture_discount_code_from_order($order) {
    if (!$order || !is_object($order)) return null;

    // Prefer coupon codes if available.
    if (method_exists($order, 'get_coupon_codes')) {
        $coupons = $order->get_coupon_codes();
        if (!empty($coupons)) {
            $first = reset($coupons);
            if (!empty($first)) return (string) $first;
        }
    }

    // Fall back to a custom checkout meta field.
    if (method_exists($order, 'get_meta')) {
        $meta = $order->get_meta('discount_code');
        if (!empty($meta)) return (string) $meta;
    }

    return null;
}

function referlabs_ri_post_conversion($order) {
    if (!class_exists('WooCommerce')) return;
    if (!function_exists('wp_remote_post')) return;

    $settings = referlabs_ri_get_settings();
    $secret = isset($settings['discount_capture_secret']) ? trim((string) $settings['discount_capture_secret']) : '';
    if (empty($secret)) return;

    $origin = isset($settings['origin']) ? (string) $settings['origin'] : 'https://referlabs.com.au';
    $origin = rtrim($origin, '/');

    $discount_code = referlabs_ri_capture_discount_code_from_order($order);
    if (empty($discount_code)) return;

    $amount = method_exists($order, 'get_total') ? (string) $order->get_total() : '';
    $order_ref = method_exists($order, 'get_order_number') ? (string) $order->get_order_number() : '';
    $email = method_exists($order, 'get_billing_email') ? (string) $order->get_billing_email() : '';

    $payload = array(
        'discountCode' => $discount_code,
        'orderReference' => $order_ref,
        'amount' => $amount,
        'metadata' => array(
            'platform' => 'woocommerce',
            'billing_email' => $email,
        ),
    );

    wp_remote_post(
        $origin . '/api/discount-codes/redeem',
        array(
            'headers' => array(
                'Content-Type' => 'application/json',
                'x-pepf-discount-secret' => $secret,
            ),
            'timeout' => 10,
            'body' => wp_json_encode($payload),
        )
    );
}

function referlabs_ri_register_woocommerce_hooks() {
    if (!class_exists('WooCommerce')) return;

    $settings = referlabs_ri_get_settings();
    $when = isset($settings['capture_on_status']) ? (string) $settings['capture_on_status'] : 'completed';

    if ($when === 'processing') {
        add_action('woocommerce_order_status_processing', 'referlabs_ri_post_conversion', 20, 1);
        return;
    }

    if ($when === 'payment_complete') {
        add_action('woocommerce_payment_complete', 'referlabs_ri_post_conversion', 20, 1);
        return;
    }

    add_action('woocommerce_order_status_completed', 'referlabs_ri_post_conversion', 20, 1);
}
add_action('plugins_loaded', 'referlabs_ri_register_woocommerce_hooks');

