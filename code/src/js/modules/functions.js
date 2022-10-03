/* Проверка поддержки webp, добавление класса webp или по-webp для HTML */
export function isWebp() {
    // Проверка поддержки webp
    function testWebP(callback) {

        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    //Добавление класса _webp или _no-webp для HTML
    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className);
    });
}










export function canva() {
    (function() {

        var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;
    
        // Main
        initHeader();
        initAnimation();
        addListeners();
    
        function initHeader() {
            width = window.innerWidth;
            height = window.innerHeight;
            target = {x: width/2, y: height/2};
    
            largeHeader = document.getElementById('large-header');
            largeHeader.style.height = height+'px';
    
            canvas = document.getElementById('demo-canvas');
            canvas.width = width;
            canvas.height = height;
            ctx = canvas.getContext('2d');
    
            // create points
            points = [];
            for(var x = 0; x < width; x = x + width/20) {
                for(var y = 0; y < height; y = y + height/20) {
                    var px = x + Math.random()*width/20;
                    var py = y + Math.random()*height/20;
                    var p = {x: px, originX: px, y: py, originY: py };
                    points.push(p);
                }
            }
    
            // for each point find the 5 closest points
            for(var i = 0; i < points.length; i++) {
                var closest = [];
                var p1 = points[i];
                for(var j = 0; j < points.length; j++) {
                    var p2 = points[j]
                    if(!(p1 == p2)) {
                        var placed = false;
                        for(var k = 0; k < 5; k++) {
                            if(!placed) {
                                if(closest[k] == undefined) {
                                    closest[k] = p2;
                                    placed = true;
                                }
                            }
                        }
    
                        for(var k = 0; k < 5; k++) {
                            if(!placed) {
                                if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                    closest[k] = p2;
                                    placed = true;
                                }
                            }
                        }
                    }
                }
                p1.closest = closest;
            }
    
            // assign a circle to each point
            for(var i in points) {
                var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
                points[i].circle = c;
            }
        }
    
        // Event handling
        function addListeners() {
            if(!('ontouchstart' in window)) {
                window.addEventListener('mousemove', mouseMove);
            }
            window.addEventListener('scroll', scrollCheck);
            window.addEventListener('resize', resize);
        }
    
        function mouseMove(e) {
            var posx = posy = 0;
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            }
            else if (e.clientX || e.clientY)    {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            target.x = posx;
            target.y = posy;
        }
    
        function scrollCheck() {
            if(document.body.scrollTop > height) animateHeader = false;
            else animateHeader = true;
        }
    
        function resize() {
            width = window.innerWidth;
            height = window.innerHeight;
            largeHeader.style.height = height+'px';
            canvas.width = width;
            canvas.height = height;
        }
    
        // animation
        function initAnimation() {
            animate();
            for(var i in points) {
                shiftPoint(points[i]);
            }
        }
    
        function animate() {
            if(animateHeader) {
                ctx.clearRect(0,0,width,height);
                for(var i in points) {
                    // detect points in range
                    if(Math.abs(getDistance(target, points[i])) < 4000) {
                        points[i].active = 0.3;
                        points[i].circle.active = 0.6;
                    } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                        points[i].active = 0.1;
                        points[i].circle.active = 0.3;
                    } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                        points[i].active = 0.02;
                        points[i].circle.active = 0.1;
                    } else {
                        points[i].active = 0;
                        points[i].circle.active = 0;
                    }
    
                    drawLines(points[i]);
                    points[i].circle.draw();
                }
            }
            requestAnimationFrame(animate);
        }
    
        function shiftPoint(p) {
            TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
                y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
                onComplete: function() {
                    shiftPoint(p);
                }});
        }
    
        // Canvas manipulation
        function drawLines(p) {
            if(!p.active) return;
            for(var i in p.closest) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.closest[i].x, p.closest[i].y);
                ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
                ctx.stroke();
            }
        }
    
        function Circle(pos,rad,color) {
            var _this = this;
    
            // constructor
            (function() {
                _this.pos = pos || null;
                _this.radius = rad || null;
                _this.color = color || null;
            })();
    
            this.draw = function() {
                if(!_this.active) return;
                ctx.beginPath();
                ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
                ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
                ctx.fill();
            };
        }
    
        // Util
        function getDistance(p1, p2) {
            return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
        }
        
    })();
}
//     (function () {

//         var canvas = document.createElement('canvas'),
//             ctx = canvas.getContext('2d'),

//             w = canvas.width = innerWidth,
//             h = canvas.height = innerHeight,
//             particles = [],
//             properties = {
//                 bgColor: 'rgba(23, 26, 33, 1)',
//                 particleColor: 'rgba(130, 109, 255, 1)',
//                 particleRadius: 3,
//                 particleCount: 60,
//                 particleMaxVelocity: 0.5,
//                 lineLenght: 150,
//                 particleLife: 6
//             };


//         document.querySelector('.footer').appendChild(canvas);

//         window.onresize = function () {
//             w = canvas.width = innerWidth,
//                 h = canvas.height = innerHeight;
//         }

//         class Particle {
//             constructor() {
//                 this.x = Math.random() * w;
//                 this.y = Math.random() * h;
//                 this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
//                 this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
//                 this.life = Math.random() * properties.particleLife * 60;

//             }
//             position() {
//                 this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
//                 this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
//                 this.x += this.velocityX;
//                 this.y += this.velocityY;
//             }
//             reDraw() {
//                 ctx.beginPath();
//                 ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
//                 ctx.closePath();
//                 ctx.fillStyle = properties.particleColor;
//                 ctx.fill();

//                 ctx.font = "20px Inter";
//                 ctx.fillText("По всем вопросам пишите на почту steam-ru@gmail.cоm Г. Москва, проспект Победы д. 12к1, Григорян Армен Андреевич", 10, 50);
//                 ctx.fillTextStyle = "white";
//                 ctx.textBaseline = "bottom";
//             }
//             reCalculateLife() {
//                 if (this.life < 1) {
//                     this.x = Math.random() * w;
//                     this.y = Math.random() * h;
//                     this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
//                     this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
//                     this.life = Math.random() * properties.particleLife * 60;
//                 }
//                 this.life--;
//             }
//         }


//         function reDrawBackground() {
//             ctx.fillStyle = properties.bgColor;
//             ctx.fillRect(0, 0, w, h);
//         }

//         function drawLines() {
//             var x1, y1, x2, y2, lenght, opacity;
//             for (var i in particles) {
//                 for (var j in particles) {
//                     x1 = particles[i].x;
//                     y1 = particles[i].y;
//                     x2 = particles[j].x;
//                     y2 = particles[j].y;
//                     lenght = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
//                     if (lenght < properties.lineLenght) {
//                         opacity = 1 - lenght / properties.lineLenght;
//                         ctx.lineWidth = '0.5';
//                         ctx.strokeStyle = 'rgba(130, 109, 255, ' + opacity + ')';
//                         ctx.beginPath();
//                         ctx.moveTo(x1, y1);
//                         ctx.lineTo(x2, y2);
//                         ctx.closePath();
//                         ctx.stroke();
//                     }
//                 }
//             }
//         }


//         function reDrawParticles() {
//             for (var i in particles) {
//                 particles[i].reCalculateLife();
//                 particles[i].position();
//                 particles[i].reDraw();
//             }
//         }

//         function loop() {
//             reDrawBackground();
//             reDrawParticles();
//             drawLines();
//             requestAnimationFrame(loop);
//         }

//         function init() {
//             for (var i = 0; i < properties.particleCount; i++) {
//                 particles.push(new Particle);
//             }
//             loop();
//         }

//         init();


//     }())
// }