var Crawler = require('../../lib/crawler').Crawler;
var expect = require('chai').expect;
var httpbinHost = 'httpbin.org';

describe('Error', function() {
    describe('timeout', function() {
        var c = new Crawler({
            timeout : 1500,
            retryTimeout : 1000,
            retries : 2
        });
        it('should return a timeout error after ~5sec', function(done) {

            // override default mocha test timeout of 2000ms
            this.timeout(10000);

            c.queue({
                uri : 'http://'+httpbinHost+'/delay/15',
                callback : function(error, result, $) {
                    expect(error).not.to.be.null;
                    expect(result).to.be.undefined;
                    done();
                }
            });
        });
        it('should retry after a first timeout', function(done) {

            // override default mocha test timeout of 2000ms
            this.timeout(15000);

            c.queue({
                uri : 'http://'+httpbinHost+'/delay/1',
                callback : function(error, result, $) {
                    expect(error).to.be.null;
                    expect(result.body).to.be.ok;
                    done();
                }
            });
        })
    });

    describe('error status code', function() {
        var c = new Crawler({
            jquery : false
        });
        it('should not return an error on a 404', function(done) {
            c.queue({
                uri : 'http://'+httpbinHost+'/status/404',
                callback : function(error, result, $) {
                    expect(error).to.be.null;
                    expect(result.statusCode).to.equal(404);
                    done();
                }
            });
        });
        it('should not return an error on a 500', function(done) {
            c.queue({
                uri : 'http://'+httpbinHost+'/status/500',
                callback : function(error, result, $) {
                    expect(error).to.be.null;
                    expect(result.statusCode).to.equal(500);
                    done();
                }
            });
        })
    });
});

//test('request statuses', function() {
//    expect(6);
//    stop();
//
//    var c = new Crawler({
//        debug: DEBUG,
//        jQuery: false,
//        onDrain: function() {
//            start();
//        }
//    });
//
//    c.queue([{
//        uri: 'http://127.0.0.1:' + MOCKPORT + '/status/200',
//        callback: function(error, result, $) {
//            equal(error,null);
//            equal(result.body,'HTTP 200');
//            equal(result.statusCode,200);
//            }
//        },
//        {
//            uri: 'http://127.0.0.1:' + MOCKPORT + '/status/404',
//            callback:function(error,result,$) {
//                equal(error,null);
//                equal(result.body,'HTTP 404');
//                equal(result.statusCode,404);
//            }
//        }
//    ]);
//});
//
//test('empty response', function() {
//    expect( 2 );
//    stop();
//
//    var c = new Crawler({
//        debug: DEBUG,
//        jQuery: false,
//        onDrain:function() {
//            start();
//        }
//    });
//
//    c.queue([{
//        uri: 'http://127.0.0.1:' + MOCKPORT + '/empty',
//        callback:function(error,result,$) {
//            equal(error,null);
//            equal(result.statusCode,204);
//        }
//    }]);
//
//
//});
